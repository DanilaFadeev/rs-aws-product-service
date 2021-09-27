import 'source-map-support/register';

import { formatJSONResponse, APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import DatabaseClient from '../../libs/DatabaseClient';
import ProductService from '../../resources/product/product.service';

const handler: APIGatewayProxyHandler = async () => {
  const client = new DatabaseClient();
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, { status: 'InternalServerError', message: 'Database connection failed' });
  }

  const productService = new ProductService(client);
  try {
    const products = await productService.find();
    return formatJSONResponse(200, products);
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, { status: 'InternalServerError', message: 'Failed to get the list of products' });
  } finally {
    await client.disconnect();
  }
}

export const getProductsList = middyfy(handler);
