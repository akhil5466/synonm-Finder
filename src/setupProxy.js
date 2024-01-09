// src/setupProxy.js
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/v1/thesaurus',
    createProxyMiddleware({
      target: 'https://api.api-ninjas.com',
      changeOrigin: true,
    }),
  )
}
