import 'source-map-support/register';

import { formatJSONResponse, APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import ProductService from '../../resources/product/product.service';


const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters || {};
  if (!id) {
    return formatJSONResponse(403, { status: 'BadRequest', message: 'Parameter id is not specified' });
  }

  const product = await ProductService.findById(id);
  if (!product) {
    return formatJSONResponse(404, { status: 'NotFound', message: 'Resource is not found' });
  }

  return formatJSONResponse(200, product);
}

export const getProductsById = middyfy(handler);
