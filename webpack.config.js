const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./vue.loader.utils')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const vueLoaderConfig = {
  loaders: utils.cssLoaders({ sourceMap: false, extract: false })
}

var path = require('path')
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
  mode: isProd ? 'production' : 'development',
  // 入口文件地址，不需要写完，会自动查找
  entry: {
    main: [
      path.join(__dirname, './src/main.js')
    ]
  },
  // 输出位置
  output: {
    path: path.join(__dirname, './build'), // 配置输出路径，文件地址，使用绝对路径形式
    filename: '[name].js',
    // 关于filename 我们有个变量就是 [name] = entry的key  当然还有别的变量比如[id],[hash]等,大家可以自行发挥
    // 我们也能把filename写成  filename : [name]/[name].[name].js 也是可以的
    // [name]这里是webpack提供的根据路口文件自动生成的名字
    publicPath: '/'
    // 公共文件生成的地址url
  },
  // 加载器
  module: {
    // 加载器
    rules: [
      // 解析.vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      // 图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 8192,
            name: '[name].[ext]'
            // name: './images/[name].[ext]?[hash:8]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new ProgressBarPlugin({
      format: '  build [:bar]  :percent (:elapsed seconds)'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        }
      }
    }
  }
}
