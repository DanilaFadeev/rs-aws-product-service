import 'source-map-support/register';

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { middyfy } from '@libs/lambda';
import { AWSEvent, SQSRecord } from '../../../types';

import ProductService from '../../../../shared/resources/product/product.service';
import DatabaseClient from '../../../../shared/libs/DatabaseClient';

interface IImportError {
  message: string;
  record: string;
};

// TODO remove message from queue ?
// TODO check for duplicates ?
// TODO output variables
// TODO import batch in db
// TODO check long pooling from Lambda to SQS
// TODO env for S3 from serverless
// TODO move packages to bottom level
// TODO better tests for catalogBatchProcess
// TODO fix and reuse product service + tests

const catalogBatchProcess = async (event: AWSEvent<SQSRecord>) => {
  const dbClient = new DatabaseClient();
  const productService = new ProductService(dbClient);

  try {
    await dbClient.connect();
  } catch (error) {
    console.log(`Database connection failed: ${error.message}`);
  }

  const importErrors: IImportError[] = [];

  for (const record of event.Records) {
    let productData;
    try {
      console.log(`Parsing: ${record.body}`);
      productData = JSON.parse(record.body);
    } catch {
      console.log(`Failed to parse product record: ${record.body}`);
      importErrors.push({ message: 'Failed to parse product record', record: record.body });
      continue;
    }

    try {
      const productId = await productService.createStockProduct(productData);
      console.log(`Product has been created with ID ${productId}`);
    } catch (error) {
      console.log(`Failed to create product: ${error.message}`);
      importErrors.push({ message: `Failed to create product: ${error.message}`, record: record.body });
    }
  }

  const snsClient = new SNSClient({});
  const publishCommand = new PublishCommand({
    TopicArn: process.env.SNS_CREATE_PRODUCT_TOPIC,
    Subject: 'Import Service - Products import',
    Message: '<h1>Hello</h1>\n' + JSON.stringify(importErrors, null, 2),
    MessageAttributes: {
      failedCount: {
        DataType: 'Number',
        StringValue: importErrors.length.toString()
      }
    }
  });
  const result = await snsClient.send(publishCommand);
  console.log(result)

  await dbClient.disconnect();
};

export const main = middyfy(catalogBatchProcess);
