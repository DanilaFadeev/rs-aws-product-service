import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

const requestLogger = async (request) => {
  // do the log for each incoming request and its arguments
  console.log(request.event, request.context);
}

export const middyfy = (handler) =>
  middy(handler)
    .before(requestLogger)
    .use(middyJsonBodyParser());
