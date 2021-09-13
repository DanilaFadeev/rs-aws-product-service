import 'source-map-support/register';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const s3Client = new S3Client({ region: 'eu-west-1' });
  const putObjectCommand = new PutObjectCommand({
    Bucket: 'rs-import-service',
    Key: `uploaded/${event.queryStringParameters.name}`
  });

  const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 });

  return formatJSONResponse(url as any);
}

export const main = middyfy(importProductsFile);
