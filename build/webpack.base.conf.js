'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

// 获取决定路径的方法（有node的path提供）
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

/*
 对于以.js或.jsx后缀结尾的文件(在src目录下或test目录下的文件)，使用eslint进行文件语法检测。
*/
// const createLintingRule = () => ({
//   test: /\.(js|jsx)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [resolve('src'), resolve('test')],
//   options: {
//     formatter: require('eslint-friendly-formatter'),
//     emitWarning: !config.dev.showEslintErrorsInOverlay
//   }
// });

/**
 * 在 node 的 js 模块里可以直接调用 exports 和 module 两个“全局”变量，但是 exports 是 module.exports 的一个引用。
 */

module.exports = {
  context: path.resolve(__dirname, '../'),   //上下文，基本目录,一个绝对路径,解决入口点和加载器配置。 
  entry: {                                   //入口文件配置
    app: './src/main.js'
  },
  output: {                                 //输出路径和命名规则  导出目录的绝对路径 在项目的根目录下 会新建dist文件夹
    path: config.build.assetsRoot,          //webpack输出的目标文件夹路径（/dist）
    filename: '[name].js',                  //webpack输出bundle文件命名格式
    publicPath: process.env.NODE_ENV === 'production'    //webpack编译输出的发布路径（相对于path）
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  /**
   * [模块resolve的规则]
   *  别名，方便引用模块，例如有了别名之后，
   * import React from 'react/dist/react.common.js'可以写成 import React from 'react'
   */
  resolve: {                                   
    extensions: ['.js', '.jsx', '.json'],    // 自动解析确定的扩展名，导入模块时不带扩展名
    alias: {
      'src': resolve('src'),
      'assets': resolve('/src/assets'),
      'components': resolve('/src/components')
    }
  },
  module: {              //不同类型模块的处理规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,                                                // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]')          // 其他的资源转移到静态资源文件夹
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')      // 文件名为name.7位hash的值.扩展名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')    // 文件名为name.7位hash的值.扩展名
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because React
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
