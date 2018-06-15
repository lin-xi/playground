const path = require('path')
const { ROOT_PATH } = path.join(__dirname)
const cssnext = require('postcss-cssnext')({
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4.0'
  ]
})

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ROOT_PATH
    }),
    require('postcss-nested'),
    cssnext
    // require('postcss-plugin-px2rem')({
    //   rootValue: 75,
    //   propBlackList: ['border','border-top','border-left','border-right','border-bottom']
    // })
  ]
}
