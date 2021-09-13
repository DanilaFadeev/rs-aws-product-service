import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
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
}
