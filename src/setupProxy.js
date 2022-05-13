const { createProxyMiddleware } = require('http-proxy-middleware');

const dbProxy = {
    target:  "http://161a-2601-646-9901-a210-00-baca.ngrok.io", //'http://DB-WebApp-1-1-LB-1259109461.us-west-2.elb.amazonaws.com',// 'http://localhost:8000',
    changeOrigin: true,
    secure: false
}

const carlaProxy = {
    target: "https://989e-2601-646-9901-a210-00-7c34.ngrok.io",
    changeOrigin: true,
    secure: false
}

module.exports = function(app) {
  app.use(
    ['/user','/admin', '/av_sim'],
    createProxyMiddleware(dbProxy)
  );

  app.use(
    ['/start-ride'],
    createProxyMiddleware(carlaProxy)
  );



};