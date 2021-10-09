import 'source-map-support/register';

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { middyfy } from '@libs/lambda';

import { AWSEvent, SQSRecord } from '../../../../shared/types';
import ProductService from '../../../../shared/resources/product/product.service';
import DatabaseClient from '../../../../shared/libs/DatabaseClient';


const snsClient = new SNSClient({});

const catalogBatchProcess = async (event: AWSEvent<SQSRecord>) => {
  const dbClient = new DatabaseClient();
  const productService = new ProductService(dbClient);

  try {
    await dbClient.connect();
  } catch (err) {
    const message = `Database connection failed: ${err.message}`;

    console.log(message);
    throw new Error(message);
  }

  let productsData = [];
  let error: Error;

  try {
    try {
      productsData = event.Records.map(record => JSON.parse(record.body));
    } catch (err) {
      console.log(`Failed to parse incoming bulk product records`);
      error = err;
    }
  
    try {
      await productService.createBulkProducts(productsData);
    } catch (err) {
      console.log(`Failed to insert bulk products: ${err.message}`);
      error = err;
    }
  } finally {
    let message = 'Products Import Notification\n';
    message += `Import status: ${error ? 'Failed' : 'Succeeded'}\n`;
    message += error ? `Error: ${error.message}\n` : `Imported products count: ${event.Records.length}\n`;
    
    const publishCommand = new PublishCommand({
      TopicArn: process.env.SNS_CREATE_PRODUCT_TOPIC,
      Subject: 'Import Service - Products import',
      Message: message,
      MessageAttributes: {
        isFailed: {
          DataType: 'String',
          StringValue: error ? 'True' : 'False'
        }
      }
    });

    await snsClient.send(publishCommand);
    console.log('SNS Notification sent');

    await dbClient.disconnect();
  }
};

export const main = middyfy(catalogBatchProcess);
