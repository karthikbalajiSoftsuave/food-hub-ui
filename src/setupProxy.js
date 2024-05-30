const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://13.201.247.48",
            changeOrigin: true,
        })
    );
};