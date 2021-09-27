import { promisify } from 'util';
import { main as handler } from '../handler';
import { mockClient } from 'aws-sdk-client-mock';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { Context } from 'aws-lambda';

jest.mock('@aws-sdk/s3-request-presigner');

const handlerPromise = promisify(handler);

// Rewrite local environments to avoid real AWS Account usage
process.env.AWS_PROFILE = 'import-service-test';
process.env.AWS_ACCESS_KEY_ID = '';
process.env.AWS_SECRET_ACCESS_KEY = '';
process.env.AWS_DEFAULT_REGION = '';

const s3Mock = mockClient(S3Client); 

describe('#importProductsFile', () => {

  const context = { awsRequestId: 'test-id' } as Context;

  afterEach(() => {
    s3Mock.reset();
    (getSignedUrl as jest.Mock).mockReset();
  });

  it('Should return signed url', async () => {
    // Arrange
    s3Mock.on(PutObjectCommand).resolves({});
    (getSignedUrl as jest.Mock).mockResolvedValue('http://example.com/products.csv?signed');

    const event = { queryStringParameters: { name: 'products.csv' } };

    // Act
    const response = await handlerPromise(event, context) as any;

    // Assert
    expect(response).toHaveProperty('statusCode', 200);
    expect(response).toHaveProperty('body', '"http://example.com/products.csv?signed"');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Credentials', true);

    expect(getSignedUrl as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it('Should return status 400 if name is not passed', async () => {
    // Arrange
    const event = {};

    // Act
    const response = await handlerPromise(event, context) as any;

    // Assert
    expect(response).toHaveProperty('statusCode', 400);
    expect(response).toHaveProperty('body', '{\"message\":\"Name must be defined on query parameters\"}');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Credentials', true);
  });

  it('Should return status 500 if failed to sign url', async () => {
    // Arrange
    s3Mock.on(PutObjectCommand).resolves({});
    (getSignedUrl as jest.Mock).mockRejectedValue(new Error('Access Denied'));

    const event = { queryStringParameters: { name: 'products.csv' } };

    // Act
    const response = await handlerPromise(event, context) as any;

    // Assert
    expect(response).toHaveProperty('statusCode', 500);
    expect(response).toHaveProperty('body', '{\"message\":\"Failed to get signed url: Access Denied\"}');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Origin', '*');
    expect(response.headers).toHaveProperty('Access-Control-Allow-Credentials', true);
  });

});