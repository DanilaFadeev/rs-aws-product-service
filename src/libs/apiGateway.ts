import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

export type APIGatewayProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

export const formatJSONResponse = (statusCode: number, response: Record<string, any> | Array<unknown>) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(response)
  }
}
