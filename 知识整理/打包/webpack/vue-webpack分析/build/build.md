``` javascript
/**
 *  打包的入口文件，主要是加载一些特效并且获取生产的基本配置，然后将配置传递给webpack进行打包
 */

// 先引入check-versions
require('./check-versions')()
// 将环境变量设置为生产模式
process.env.NODE_ENV = 'production'
// 用来显示出在打包时的一个加载中的效果
var ora = require('ora')
// 删除文件
var rm = require('rimraf')
// 1、path.dirname()  :获取目录
// 2、path.basename() ：获取文件名.扩展名(我们统称为全名)
// 3、path.extname()  : 获取扩展名
// 4、path.parse()    : 将一个路径转换成一个js对象
// 5、path.format()   ：将一个js对象转换成路径
// 6、join()          : 拼接多个路径成一个路径
// 7、path.resolve() :将相对路径转为绝对路径
// 对路径进行处理
var path = require('path')
// 字体颜色
var chalk = require('chalk')
// webpack 的核心打包方法
var webpack = require('webpack')
// 获取公用变量
var config = require('../config')
// 获取生产模式下的打包配置
var webpackConfig = require('./webpack.prod.conf')
// 开启转圈圈样式
var spinner = ora('building for production...')
spinner.start()
// 先将dist下的的static文件夹删除
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 将配置传给webpack进行打包
  webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    // 将打包结果输出到控制台上
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
```

