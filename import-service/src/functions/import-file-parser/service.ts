import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import productSchema from '../../../../shared/resources/product/product.schema';

const sqsClient = new SQSClient({});
const s3Client = new S3Client({});


export default class FileParserService {

  static ARRAY_SPLITTER = '|';

  static processRecord(record: Record<string, string>) {
    return Object.keys(record)
      .reduce((productData, key) => {
        if (productSchema.properties[key]) {
          switch (productSchema.properties[key].type) {
            case 'number':
              productData[key] = +record[key];
              break;
            case 'array':
              productData[key] = record[key].split(FileParserService.ARRAY_SPLITTER);
              break;
            default:
              productData[key] = record[key];
          }
        }
        return productData;
      }, {});
  }

  static async sendSqsMessage(payload: Record<string, any>) {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: process.env.SQS_CATALOG_ITEMS_QUEUE,
      MessageBody: JSON.stringify(payload)
    });
    return sqsClient.send(sendMessageCommand);
  }

  static async getS3Object(key: string) {
    const s3Bucket = process.env.S3_IMPORT_SERVICE_BUCKET;
    return s3Client.send(
      new GetObjectCommand({ Bucket: s3Bucket, Key: key })
    );
  }

  static async moveS3Object(sourceKey: string, destKey: string): Promise<void> {
    const s3Bucket = process.env.S3_IMPORT_SERVICE_BUCKET;

    // copy destKey from sourceKey to destKey
    await s3Client.send(
      new CopyObjectCommand({
        Bucket: s3Bucket,
        CopySource: `${s3Bucket}/${sourceKey}`,
        Key: destKey
      })
    );
    
    // remove copied object from sourceKey
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: s3Bucket,
        Key: sourceKey
      })
    );
  }
};
