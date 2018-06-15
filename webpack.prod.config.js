const webpack = require('webpack')
// const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const utils = require('./vue.loader.utils')

const vueConfig = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: [
        'iOS >= 7',
        'Android >= 4.0',
        'last 2 Chrome versions',
        'last 2 Safari versions'
      ]
    })
  ],
  loaders: utils.cssLoaders({ sourceMap: false, extract: true })
}

var path = require('path')
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
  // 入口文件地址，不需要写完，会自动查找
  entry: {
    main: [path.join(__dirname, './src/main.js')],
    preview: [path.join(__dirname, './src/preview.js')],
    vendor: ['vue']
  },

  // 输出位置
  output: {
    path: path.join(__dirname, './build'), // 配置输出路径，文件地址，使用绝对路径形式
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: ''
  },
  // 加载器
  module: {
    // 加载器
    rules: [
      // 解析.vue文件
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
        options: vueConfig,
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'buildBase')
        ]
      },
      // 转化ES6的语法
      {
        test: /\.js$/,
        // loaders: 'happypack/loader?id=jsx',
        loaders: 'babel-loader?cacheDirectory',
        exclude: [
          path.join(__dirname, 'buildBase')
        ]
      },
      // 图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loaders: 'url-loader',
        query: {
          limit: 8192,
          name: '[name].[ext]'
          // name: './images/[name].[ext]?[hash:8]'
        }
        // 在这无论是直接loader 后面跟参数(像url跟参一样)url-loader?limit=8192,或者是后面跟着一个对象 query,都是可以的.类似get请求？
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?minimize',
          'autoprefixer-loader?{browsers:["iOS >= 7","Android >= 4.0","last 2 Chrome versions","last 2 Safari versions"]}'
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?minimize', 'sass-loader?sourceMap']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?minimize', 'less-loader?sourceMap']
      },
      {
        test: /\.woff(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff']
      },
      {
        test: /\.woff2(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff']
      },
      {
        test: /\.ttf(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=application/octet-stream']
      },
      {
        test: /\.eot(\?t=\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.svg(\?t=\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=image/svg+xml']
      }
    ]
  },
  // 这里我就只用到一个就是生成 独立的css文件,style嵌套在页面里的方式实在是丑得不行
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      vue: 'vue/dist/vue.js',
      components: path.join(__dirname, 'src/components'),
      api: path.join(__dirname, 'isomorph/api'),
      request: path.join(__dirname, 'isomorph/request'),
      utils: path.join(__dirname, 'src/utils.js'),
      platform: path.join(__dirname, 'src/platform.js'),
      src: path.join(__dirname, 'src')
    },
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  // 开启source-map调试模式，webpack有多种source-map，在官网文档可以查到
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'preview', 'EditPage', 'MinePage', 'MineWidget', 'MineComponent', 'Models'],
      async: 'async-common',
      minChunks: 2
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new HtmlWebpackPlugin({
      chunks: ['main', 'vendor'],
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['preview', 'vendor'],
      template: path.join(__dirname, 'src/preview.html'),
      filename: 'preview.html'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      logLevel: 'info'
    })
  ]
}
