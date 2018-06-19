const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

var app = express()

var compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  logLevel: 'error'
}))
app.use(webpackHotMiddleware(compiler))

app.listen(8800, '127.0.0.1', () => {
  console.log('server start at 127.0.0.1:8800')
})
