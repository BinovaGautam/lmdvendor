const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/utilities',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      autoRewrite: true,
    })
  );
  app.use(
    '/repair_requests',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      autoRewrite: true,
    })
  );
  app.use(
    '/quotations',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      autoRewrite: true,
    })
  );
};
