import 'source-map-support/register';

import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';
import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { AWSEvent, S3Record } from '../../../types';

const s3Bucket = 'rs-import-service';

const importFileParser = async (event: AWSEvent<S3Record>) => {
  console.log(event);
  const records = event.Records.filter(record => record.eventSource === 'aws:s3');

  const s3Client = new S3Client({});
  const sqsClient = new SQSClient({});

  for (let i = 0; i < records.length; i++) {
    const cmd = new GetObjectCommand({ Bucket: s3Bucket, Key: records[0].s3.object.key });
    const response = await s3Client.send(cmd);

    await new Promise(async (resolve, reject) => {
      response.Body
        .setEncoding('utf8')
        .pipe(csv())
        .on('data', record => {
          // parse array values
          const productData = Object.keys(record).reduce((acc, key) => {
            return { ...acc, [key]: key === 'artists' ? record[key].split('|') : record[key] };
          }, {});

          const sendMessageCommand = new SendMessageCommand({
            QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/734757367619/catalog-items-queue',
            MessageBody: JSON.stringify(productData)
          });
          sqsClient.send(sendMessageCommand);
        })
        .on('end', async () => {
          const copyObjectCommand = new CopyObjectCommand({
            Bucket: s3Bucket,
            CopySource: `${s3Bucket}/${records[0].s3.object.key}`,
            Key: records[0].s3.object.key.replace('uploaded', 'parsed')
          });
          const response = await s3Client.send(copyObjectCommand);
          console.log(response);
          const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: s3Bucket,
            Key: records[0].s3.object.key
          });
          const response22 = await s3Client.send(deleteObjectCommand);
          console.log(response22);

          resolve(void 0);
        })
        .on('err', reject);
    });
  }
}

export const main = middyfy(importFileParser);
