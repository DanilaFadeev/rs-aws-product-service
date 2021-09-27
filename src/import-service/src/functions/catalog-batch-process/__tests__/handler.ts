import { promisify } from 'util';
import { main as handler } from '../handler';
import { mockClient } from 'aws-sdk-client-mock';
import { SNSClient } from '@aws-sdk/client-sns';
import type { Context } from 'aws-lambda';
import type { AWSEvent, SQSRecord } from '../../../../types';

const handlerPromise = promisify(handler);

const objMockReset = (obj: Record<string, jest.Mock>) => {
  Object.values(obj).forEach(mock => mock.mockReset());
}

// AWS clients mocks
const snsMock = mockClient(SNSClient);

// DatabaseClient mocks
const DatabaseClientMocks = {
  connect: jest.fn(),
  disconnect: jest.fn(),
  execute: jest.fn()
};

jest.mock('../../../../../shared/libs/DatabaseClient', () => {
  return jest.fn().mockImplementation(() => DatabaseClientMocks);
});

// ProductService mocks
const ProductServiceMocks = {
  createStockProduct: jest.fn()
};

jest.mock('../../../../../shared/resources/product/product.service', () => {
  return jest.fn().mockImplementation(() => ProductServiceMocks);
});


describe('#catalogBatchProcess', () => {

  const context = { awsRequestId: 'test-id' } as Context;

  afterEach(() => {
    snsMock.reset();

    objMockReset(DatabaseClientMocks);
    objMockReset(ProductServiceMocks);
  });

  it('Should create 2 products and publish SNS message', async () => {
    // Arrange
    const event: AWSEvent<Partial<SQSRecord>> = { Records: [{ body: '{ "name": "Product 1" }' }, { body: '{ "name": "Product 2" }' }] };

    // Act
    await handlerPromise(event, context);

    // Assert
    expect(DatabaseClientMocks.connect).toHaveBeenCalledTimes(1);
    expect(DatabaseClientMocks.disconnect).toHaveBeenCalledTimes(1);

    expect(ProductServiceMocks.createStockProduct).toHaveBeenCalledTimes(2);
    expect(ProductServiceMocks.createStockProduct.mock.calls[0][0]).toEqual({ name: 'Product 1' });
    expect(ProductServiceMocks.createStockProduct.mock.calls[1][0]).toEqual({ name: 'Product 2' });

    expect(snsMock.calls()).toHaveLength(1);
    expect(snsMock.calls()[0].firstArg.input).toEqual({
      TopicArn: undefined,
      Subject: 'Import Service - Products import',
      Message: '<h1>Hello</h1>\\n'
    });
  });

  it('Should skip incorrect products', async () => {
     // Arrange
     const event: AWSEvent<Partial<SQSRecord>> = { Records: [{ body: 'NOT_VALID_JSON' }, { body: '{ "name": "Product 3" }' }] };

     // Act
     await handlerPromise(event, context);
 
     // Assert
     expect(DatabaseClientMocks.connect).toHaveBeenCalledTimes(1);
     expect(DatabaseClientMocks.disconnect).toHaveBeenCalledTimes(1);
 
     expect(ProductServiceMocks.createStockProduct).toHaveBeenCalledTimes(1);
     expect(ProductServiceMocks.createStockProduct.mock.calls[0][0]).toEqual({ name: 'Product 3' });
 
     expect(snsMock.calls()).toHaveLength(1);
     expect(snsMock.calls()[0].firstArg.input).toEqual({
       TopicArn: undefined,
       Subject: 'Import Service - Products import',
       Message: '<h1>Hello</h1>\\n'
     });
  });

});
