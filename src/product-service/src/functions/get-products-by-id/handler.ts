import 'source-map-support/register';

import { formatJSONResponse, APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import DatabaseClient from '../../libs/DatabaseClient';
import ProductService from '../../resources/product/product.service';


const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters || {};
  if (!id) {
    return formatJSONResponse(400, { status: 'BadRequest', message: 'Parameter id is not specified' });
  }

  const client = new DatabaseClient();
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, { status: 'InternalServerError', message: 'Database connection failed' });
  }

  const productService = new ProductService(client);
  try {
    const product = await productService.findById(id);
    if (!product) {
      return formatJSONResponse(404, { status: 'NotFound', message: 'Resource is not found' });
    }
    return formatJSONResponse(200, product);
  } catch (error) {
    console.log(error);
    return formatJSONResponse(500, { status: 'InternalServerError', message: 'Failed to get the list of products' });
  } finally {
    await client.disconnect();
  }
}

export const getProductsById = middyfy(handler);
