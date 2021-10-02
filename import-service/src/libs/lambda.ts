import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";

const eventLogger = async (event) => {
  // do the log for each incoming event
  console.log(event);
}

export const middyfy = (handler) =>
  middy(handler)
    .before(eventLogger)
    .use(middyJsonBodyParser());
