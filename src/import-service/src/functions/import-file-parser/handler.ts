import 'source-map-support/register';

import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';
import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';


type S3Event = {
  eventSource: 'aws:s3' | string;
  s3: {
    object: {
      key: string;
      size: number;
    };
  };q
};

type Event = { Records: S3Event[] };

const s3Bucket = 'rs-import-service';

const importFileParser = async (event: Event) => {
  console.log(event);
  const records = event.Records.filter(record => record.eventSource === 'aws:s3');

  const s3Client = new S3Client({});

  for (let i = 0; i < records.length; i++) {
    const cmd = new GetObjectCommand({ Bucket: s3Bucket, Key: records[0].s3.object.key });
    const response = await s3Client.send(cmd);

    await new Promise(async (resolve, reject) => {
      response.Body
        .setEncoding('utf8')
        .pipe(csv())
        .on('data', (record) => {
          console.log(record);
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
