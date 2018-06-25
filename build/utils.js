'use strict'
const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')

/*
 * 生成静态资源的路径
 * @method assetsPath
 * @param {String} _path 相对于静态资源文件夹的文件路径
 * @return {String} 静态资源的完整路径
 */
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    // path.posix 和 path.win32，前者跨平台，后者只是win上
  return path.posix.join(assetsSubDirectory, _path)    //以 posix 兼容的方式交互
}

/*
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param {Object} options 生成的配置
 options = {
   // 是否开启 sourceMap
   sourceMap: true,
   // 是否提取css
   extract: true
 }
 @return {Object} 处理css的loaders的配置对象
*/

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {                              // options是loader的选项配置
      sourceMap: options.sourceMap         // 根据参数是否生成sourceMap文件 生成环境下压缩文件
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  /*
   生成loader字符串
   @method generateLoaders
   @param {Array} loader 名称数组
   @return {String | Object} ExtractTextPlugin对象或loader字符串
   */
  function generateLoaders (loader, loaderOptions) {                                       // 生成loader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]          // 默认是css-loader

    if (loader) {                     // 如果参数loader存在
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {          // 将loaderOptions和sourceMap组成一个对象
          sourceMap: options.sourceMap 
        })
      })
    }
    return ['style-loader'].concat(loaders)      //特别提示：这个地方是唯一改动最大的因为react里要单独引入css,使用的是style-loader，不是vue-style-loader
  }

  // 返回css类型对应的loader组成的对象 generateLoaders()来生成loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}


/*
 生成style-loader的配置
 style-loader文档：https://github.com/webpack/style-loader
 @method styleLoaders
 @param {Object} options生成的配置
 @return {Array} style-loader的配置
*/

// 为独立样式文件生成加载程序
exports.styleLoaders = function (options) {
  const output = []      // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  const loaders = exports.cssLoaders(options)    // 调用cssLoaders方法返回各类型的样式对象

  for (const extension in loaders) { // 循环遍历loaders
    const loader = loaders[extension]    // 根据遍历获得的key(extension)来得到value(loader)
    output.push({
      test: new RegExp('\\.' + extension + '$'),    // 处理的文件类型
      use: loader       // 用loader来处理，loader来自loaders[extension]
    })
  }
  return output
}

// https://www.npmjs.com/package/node-notifier
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
