'use strict'
// Template version: 1.0.0

const path = require('path')

module.exports = {
  dev: {

    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // proxyTable: {
    //   '/api': {
    //     target: 'http://paystage.shaloudai.com', // 接口的域名
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },

    // 本地访问 http://localhost:8080
    host: 'localhost', 
    // 监听的端口
    port: 8080, 
    // 是否自动打开浏览器
    autoOpenBrowser: false,
    // 发生错误时 是否重新加载
    errorOverlay: true,
    // 发生错误时 是否通知
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    //sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
    // https://webpack.js.org/configuration/devtool/#development
    // 开发环境可以查看源码
    devtool: 'cheap-module-eval-source-map',    

    // set this to false - it *may* help
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // html入口文件，生产环境打包模板文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // 产品文件的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'static',
    // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: '/',

    // 是否使用source-map
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // npm install --save-dev compression-webpack-plugin
    // 是否开启gzip压缩
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzipExtensions: ['js', 'css'],

    // `npm run build --report`
    // 是否展示webpack构建打包之后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
