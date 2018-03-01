const express = require('express');
const next = require('next');

const PORT = parseInt(process.env.APP_PORT, 10) || 3000;
const app = next({ dev: process.env.NODE_ENV === 'development' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get('/', (req, res) => app.render(req, res, '/', req.query));
  server.get('*', (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is listening at ${PORT}`);
  });
});
