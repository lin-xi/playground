process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware');
const config = require('./webpack.config')
const compiler = webpack(config);
const Queue = require('bull');
const favicon = require('serve-favicon')
var session = require('express-session')
var bodyParser = require('body-parser')
const uuap = require('./server/busineses/uuap')
import checkQueue from './server/busineses/queueCheck'
let glob = {
    cache: {}
};

// glob.shotQueue = Queue('shotQueue', 6688, '127.0.0.1');
// glob.buildQueue = Queue('buildQueue', 6688, '127.0.0.1');
glob.shotQueue = {};
glob.buildQueue = {};

const resolve = file => path.resolve(__dirname, file)

const ApiAction = require('./server/actions')

const app = express()

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(favicon('./public/logo.png'))
app.use('/public', serve('./public'))
app.use(serve('./build'))

app.use('/pinzhi', proxy('http://waimai.baidu.com/pinzhi'));
app.use('/fly', proxy('http://waimai.baidu.com/fly'));
app.use('/templet', proxy('http://waimai.baidu.com/templet'));
app.use('/strategyui', proxy('http://waimai.baidu.com/strategyui'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'e08Hr53kY~Xjs3j19Mq!oGs2v',
    resave: false,
    saveUninitialized: true
}))
app.use(uuap);

app.use('/api', ApiAction(glob))


const port = process.env.PORT || 8089
const host = process.env.HOST || 'iwm.baidu.com'
app.listen(port, host, () => {
    console.log(`server started at ${host}:${port}`)
})
