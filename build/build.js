'use strict'
/**
 * [react生产打包]
 */

require('./check-versions')()   //检查NodeJS和npm的版本

/**
 * process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。
 * process.env属性返回一个包含用户环境信息的对象
 * 永久配置环境变量：右键(此电脑) -> 属性(R) -> 高级系统设置 -> 环境变量(N)...
 * NODE_ENV是可以自定义的，环境变量名
 */

process.env.NODE_ENV = 'production'    //设置node进程的环境变量为production，表示为生产环境

/**
 * 以下模块除了path是node内置模块，其余的都需要安装
 */

// loading 插件
const ora = require('ora')   //打包开始提示（注意：打包结束回调里我们要再次进行关闭 spinner.stop(),不然会一直spinner着，不停的转啊转）
// 可以在 node 中执行`rm -rf`的工具
const rm = require('rimraf') //用来清除之前的打包（注意：rm()里面的路径一定要是绝对路径。相对路径不会册除成功的）
// node自带的文件路径工具
const path = require('path')
// 在终端输出带颜色的文字
const chalk = require('chalk')
const webpack = require('webpack')
// 配置文件
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

//开始打包 
// 在终端显示loading效果，并输出提示
const spinner = ora('building for production...')
spinner.start()

// 删除这个文件夹 （递归删除）
// 每次打包之前先清除build/static文件夹（要删除的文件在config文件夹里配置）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 构建
  webpack(webpackConfig, (err, stats) => {  //清除完成，开始用webpack打包，webpack打包使用了webpack.prod.conf.js
    // 构建成功
    // 停止loading的动画
    spinner.stop()                          //打包成功结束打包提示（结束时会在终端输出hash,webpack版本，打包用时）
    if (err) throw err
    process.stdout.write(stats.toString({   //命令行进程（将输入流数据输出到输出流，即输出到终端）
      colors: true,
      modules: false,
      children: false, // 如果您正在使用TS加载程序，将其设置为true将在生成过程中显示TysScript错误。
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 生产包打完的提示
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
