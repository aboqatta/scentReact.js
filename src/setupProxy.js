const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7256',
      changeOrigin: true,
      secure: false, // Add this line for self-signed certificates
    })
  );
};
