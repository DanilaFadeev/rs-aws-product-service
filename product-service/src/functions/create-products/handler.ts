import 'source-map-support/register';

import { formatJSONResponse, APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import DatabaseClient from '../../libs/DatabaseClient';
import ProductService from '../../resources/product/product.service';

const handler: APIGatewayProxyHandler = async (event) => {
  const client = new DatabaseClient();
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, { status: 'InternalServerError', message: 'Database connection failed' });
  }

  const productService = new ProductService(client);
  try {
    const productId = await productService.createStockProduct(event.body as any);
    return formatJSONResponse(200, { productId });
  } catch (error) {
    console.log(error);
    return formatJSONResponse(400, { status: 'BadRequest', message: error.message });
  } finally {
    await client.disconnect();
  }
}

export const createProducts = middyfy(handler);
