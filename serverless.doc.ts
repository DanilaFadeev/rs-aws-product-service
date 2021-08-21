import { version, name, description } from './package.json';
import productSchema from './src/resources/product/product.schema';

export default {
  title: name,
  description,
  version,
  servers: [{
    url: 'https://oxgr1oja31.execute-api.eu-west-1.amazonaws.com/dev/',
    description: 'Development env'
  }],
  models: [{
    name: 'Product',
    description: 'Product',
    contentType: 'application/json',
    schema: productSchema
  },
  {
    name: 'ProductsListResponse',
    description: 'List of products',
    contentType: 'application/json',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Product'
      }
    }
  }]
};