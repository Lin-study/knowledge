# dev-server.js

- 检查npm与node的版本
- 引入相关插件和配置
- 创建express服务器和webpack编译器
- 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
- 挂载代理服务和中间件
- 配置静态资源
- 启动服务器监听特定端口（8080）
- 自动打开浏览器并打开特定网址（localhost:8080）

``` javascript
// 检查版本
require('./check-versions')()
// 获取config下的配置
var config = require('../config')
// 如果没有通过DefinePlugin设置全局process.env字段，那么默认为开发环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
//可以调用默认软件打开网址、图片、文件等内容的插件
var opn = require('opn')
var path = require('path')
// 作为服务的核心
var express = require('express')
var webpack = require('webpack')
// 后台将请求转发给其它服务器，如果发生了跨域的情况，可以通过http-proxy-middleware这个中间件进行反向代理，解决跨域问题
var proxyMiddleware = require('http-proxy-middleware')
// 开发环境的配置
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 端口号
var port = process.env.PORT || config.dev.port
// 是否打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 获取路由转发配置
var proxyTable = config.dev.proxyTable

var app = express()
// webpack代码运行实例
var compiler = webpack(webpackConfig)
// 该插件对更改的文件进行监控，编译,与webpack-hot-middleware配合使用
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 设置中间件的公共路径，值与webpack的公共路径相同
  // 这个路径就是内存中存储的文件所在的路径
  publicPath: webpackConfig.output.publicPath,
  // 不在控制台显示任何信息
  quiet: true
})
// 热更新插件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 设置回调来访问编译对象
compiler.plugin('compilation', function(compilation) {
  // 设置回调来访问html-webpack-plugin的after-emit（发射后）钩子
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    // 发布热重载事件并传入一个对象，在dev-client.js中可以subscribe到这个对象
    hotMiddleware.publish({
      action: 'reload'
    })
    // 由于after-emit阶段是异步的，所以必须设置一个回调函数并调用它
    cb()
  })
})

// 遍历反向代理的配置，利用proxyMiddleware进行反向代理
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 当用户通过点击刷新按钮或直接输入地址方式访问页面，出现页面找不到的问题
//（绕开了history API， vue-router是通过 History API 实现的）所以会出现找不到页面的情况
// 该插件则会将请求转发给 index.html
app.use(require('connect-history-api-fallback')())
// 将暂存在内存中的webpack编译后的文件挂载到实例上
app.use(devMiddleware)
// 将热重载挂载到实例上并输出相关状态和编译错误
app.use(hotMiddleware)
// 获取配置中的静态资源绝对路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 当开发环境中如果遇到了路径为staticPath的资源，那么到./static中引用该资源
app.use(staticPath, express.static('./static'))
// 默认启动路径
var uri = 'http://localhost:' + port + "/chart"

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it

  // 打开之前设定好的网站
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
// 监听端口
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
```

