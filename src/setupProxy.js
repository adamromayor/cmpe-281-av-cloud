const { createProxyMiddleware } = require('http-proxy-middleware');

const dbProxy = {
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure: false
}

const localProxy = {
    target: 'http://localhost:5050',
    changeOrigin: true,
    secure: false
}

module.exports = function(app) {
  app.use(
    ['/user','/admin', '/av_sim'],
    createProxyMiddleware(dbProxy)
  );

  app.use(
    ['/rides','/vehicles', '/serviceRecords', '/rideTable'],
    createProxyMiddleware(localProxy)
  );
};