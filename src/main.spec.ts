import * as request from 'supertest';
import main from './main';

describe("myApp", () => {
  it('should implement CORS', async() => {
    let app = await main;
    const { headers } = await request(app.getHttpServer()).get('/');
    expect(headers['access-control-allow-origin']).toEqual('*');
  });
});