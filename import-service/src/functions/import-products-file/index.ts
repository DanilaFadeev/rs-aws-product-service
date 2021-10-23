import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
				authorizer: {
					arn: 'arn:aws:lambda:eu-west-1:734757367619:function:authorization-service-dev-basicAuthorizer',
					type: 'token'
				},
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        response: {
          statusCodes: {
            201: {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          }
        }
      }
    }
  ]
};
