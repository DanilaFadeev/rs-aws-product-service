import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsList`,
  events: [
    {
      http: {
        path: 'products',
        method: 'get',
        cors: true,
        response: {
          statusCodes: {
            200: {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          }
        },
        documentation: {
          summary: 'Get products list',
          description: 'Get the list of all the service products',
          tags: ['Product'],
          methodResponses: [{
            statusCode: 200,
            responseBody: {
              description: 'Array of product objects'
            },
            responseModels: {
              'application/json': 'ProductsListResponse'
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
