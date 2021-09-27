import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProducts`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        response: {
          statusCodes: {
            201: {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          }
        },
        cors: true,
        documentation: {
          summary: 'Create product',
          description: 'Create new product resource',
          tags: ['Product'],
          methodResponses: [{
            statusCode: 201,
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
