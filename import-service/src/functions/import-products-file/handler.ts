import 'source-map-support/register';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  if (!event.queryStringParameters?.name) {
    return formatJSONResponse(400, { message: 'Name must be defined on query parameters' });
  }

  const s3Client = new S3Client({ region: 'eu-west-1' });
  const putObjectCommand = new PutObjectCommand({
    Bucket: 'rs-import-service',
    Key: `uploaded/${event.queryStringParameters.name}`
  });

  let url = '';
  try {
    url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 });
  } catch (err) {
    return formatJSONResponse(500, { message: `Failed to get signed url: ${err.message}` });
  }

  return formatJSONResponse(200, url as any);
}

export const main = middyfy(importProductsFile);
