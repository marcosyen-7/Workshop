const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello DevOps Workshop!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.post('/echo', (req, res) => {
  res.json({ received: req.body });
});

app.get('/sum', (req, res) => {
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);
  if (isNaN(x) || isNaN(y)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }
  res.json({ result: x + y });
});

module.exports = app;