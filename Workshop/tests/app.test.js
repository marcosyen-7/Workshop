const request = require('supertest');
const app = require('../src/app');

describe('app', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello DevOps Workshop!');
  });

  it('GET /health should return status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.uptime).toBeGreaterThan(0);
  });

  it('POST /echo should return the same body', async () => {
    const payload = { name: 'DevOps', workshop: true };
    const res = await request(app).post('/echo').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual(payload);
  });

  it('GET /sum should return correct sum', async () => {
    const res = await request(app).get('/sum?x=5&y=3');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  it('GET /sum should return error for invalid numbers', async () => {
    const res = await request(app).get('/sum?x=a&y=3');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid numbers');
  });
});