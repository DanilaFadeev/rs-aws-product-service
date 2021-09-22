import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        request: {
          parameters: {
            paths: {
              id: true
            }
          }
        },
        response: {
          statusCodes: {
            200: {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          }
        },
        cors: true,
        documentation: {
          summary: 'Get product by id',
          description: 'Get product information by its id',
          tags: ['Product'],
          pathParams: [{
            name: 'id',
            description: 'Product id',
            schema: {
              type: 'number'
            }
          }],
          methodResponses: [{
            statusCode: 200,
            responseBody: {
              description: 'Product object'
            },
            responseModels: {
              'application/json': 'Product'
            },
            responseHeaders: [{
              name: 'Content-Type',
              description: 'Content Type header',
              schema: {
                type: 'string'
              }
            }, {
              name: 'Access-Control-Allow-Origin',
              description: 'CORS allow origin header',
              schema: {
                type: 'string'
              }
            }, {
              name: 'Access-Control-Allow-Credentials',
              description: 'CORS allow credentials header',
              schema: {
                type: 'boolean'
              }
            }]
          }]
        }
      }
    }
  ]
};
