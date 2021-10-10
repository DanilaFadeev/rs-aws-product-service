import 'source-map-support/register';

import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';
import FileParserService from './service';
import { AWSEvent, S3Record } from '../../../../shared/types';


const importFileParser = async (event: AWSEvent<S3Record>) => {
  const records = event.Records.filter(record => record.eventSource === 'aws:s3');

  for (let i = 0; i < records.length; i++) {
    const response = await FileParserService.getS3Object(records[0].s3.object.key);

    await new Promise<void>(async (resolve, reject) => {
      response.Body
        .setEncoding('utf8')
        .pipe(csv())
        .on('data', record => {
					console.log('Record parsed', record);
          const productData = FileParserService.processRecord(record);
          FileParserService.sendSqsMessage(productData);
        })
        .on('end', async () => {
          const sourceKey = records[0].s3.object.key;
          const destKey = sourceKey.replace('uploaded', 'parsed');

          await FileParserService.moveS3Object(sourceKey, destKey);
          resolve();
        })
        .on('err', reject);
    });
  }
}

export const main = middyfy(importFileParser);
