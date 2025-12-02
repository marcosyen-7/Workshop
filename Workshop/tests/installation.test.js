
const http = require('http');
const path = require('path');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

describe('installation', () => {
  jest.setTimeout(15000);
  it('runs the packaged binary and responds on /', async () => {
    await new Promise(r => setTimeout(r, 1200));
    const res = await httpGet('http://127.0.0.1:3000/');
    expect(res.statusCode).toBe(200);
    const json = JSON.parse(res.body);
    expect(json.message).toBe('Hello DevOps Workshop!');
  });
});
