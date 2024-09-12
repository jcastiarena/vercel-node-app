// test/hello.test.js
import { expect } from 'chai';
import request from 'supertest';
import app from '../api/hello.js';  // Add .js since it's required for ES modules

describe('GET /api/hello', () => {
  it('should return hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Hello from Vercel Serverless, Saverio!');
  });
});
