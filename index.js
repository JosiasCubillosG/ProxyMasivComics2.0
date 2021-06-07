const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const router = express.Router();

const options = {
    target: 'https://xkcd.com/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      [`^/comic`]: '',
    } 
    // rewrites our endpoints to '' when forwarded to our target
}


/* app.use('', (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
}) */

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/comic', createProxyMiddleware(options))

app.get('/info', (req, res, next) => {
  res.send('This is a proxy');
});

app.listen(3000, 'localhost', () => console.log('Escuchando en el puerto 3000'));