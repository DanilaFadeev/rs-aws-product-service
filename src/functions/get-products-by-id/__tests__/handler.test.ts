import { getProductsById as handler } from '../handler';
import type { Context, APIGatewayProxyEvent } from 'aws-lambda';

describe('#getProductsById', () => {

  const context = { awsRequestId: 'test-id' } as Context;

  it('Should return product by id', done => {
    const event = { pathParameters: { id: '1' } } as unknown as APIGatewayProxyEvent;
    const callback = (err, response) => {
      expect(err).toBeNull();

      expect(response).toHaveProperty('statusCode', 200);
      expect(response).toHaveProperty('body');
      expect(typeof response.body).toBe('string');

      const body = JSON.parse(response.body);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('type');
      expect(body).toHaveProperty('artists');
      expect(body).toHaveProperty('coverUri');
      expect(body).toHaveProperty('price');

      done();
    };
    
    handler(event, context, callback);
  });

  it('Should fail if "id" is not specified', done => {
    const event = { pathParameters: {} } as any;
    const callback = (err, response) => {
      expect(err).toBeNull();

      expect(response).toHaveProperty('statusCode', 403);
      expect(response).toHaveProperty('body');
      expect(typeof response.body).toBe('string');

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('status', 'BadRequest');
      expect(body).toHaveProperty('message', 'Parameter id is not specified');

      done();
    };
    
    handler(event, context, callback);
  });

  it('Should fail if product is not found', done => {
    const event = { pathParameters: { id: '999' } } as any;
    const callback = (err, response) => {
      expect(err).toBeNull();

      expect(response).toHaveProperty('statusCode', 404);
      expect(response).toHaveProperty('body');
      expect(typeof response.body).toBe('string');

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('status', 'NotFound');
      expect(body).toHaveProperty('message', 'Resource is not found');

      done();
    };
    
    handler(event, context, callback);
  });

});