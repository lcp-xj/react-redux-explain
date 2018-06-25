'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')      // webpack-merge是一个可以合并数组和对象的插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 开发环境下的webpack配置，通过merge方法合并webpack.base.conf.js基础配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
    // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
    // 通过传入一些配置来获取rules配置，此处传入了sourceMap: false,表示不生成sourceMap
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,

  /**
   * [webpack服务器，还是由node提供]
   * 是从webpack-dev-server提取的
   * 提供热加载，反向代理服务器等
   */
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, //  因为我们使用了CopyWebPcPultin。
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // 友好的必要条件
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({    // 编译时配置的全局变量
      'process.env': require('../config/dev.env')   // 当前环境为开发环境
    }),
    new webpack.HotModuleReplacementPlugin(),         // 开启webpack热更新功能
    new webpack.NamedModulesPlugin(), // HMR在控制台上显示正确的文件名e.
    new webpack.NoEmitOnErrorsPlugin(),    // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({           // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
      filename: 'index.html',         //输出文件
      template: 'index.html',         //模板文件
      inject: true
    }),
    // 复制静态资源,将static文件内的内容复制到指定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({    // 友好的错误提示
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
