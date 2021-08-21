import { getProductsList as handler } from '../handler';
import type { Context, APIGatewayProxyEvent } from 'aws-lambda';

describe('#getProductsList', () => {

  const context = { awsRequestId: 'test-id' } as Context;

  it('Should return products list', done => {
    const event = {} as unknown as APIGatewayProxyEvent;
    const callback = (err, response) => {
      expect(err).toBeNull();

      expect(response).toHaveProperty('statusCode', 200);
      expect(response).toHaveProperty('body');
      expect(typeof response.body).toBe('string');

      const body = JSON.parse(response.body);
      expect(body).toHaveLength(24);
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('title');
      expect(body[0]).toHaveProperty('type');
      expect(body[0]).toHaveProperty('artists');
      expect(body[0]).toHaveProperty('coverUri');
      expect(body[0]).toHaveProperty('price');

      done();
    };
    
    handler(event, context, callback);
  });

});