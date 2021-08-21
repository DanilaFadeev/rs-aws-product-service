import 'source-map-support/register';

import { formatJSONResponse, APIGatewayProxyHandler } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import ProductService from '../../resources/product/product.service';


const handler: APIGatewayProxyHandler = async () => {
  const products = await ProductService.find();
  return formatJSONResponse(200, products);
}

export const getProductsList = middyfy(handler);
