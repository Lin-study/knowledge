const express = require('express')
const webpackDevMid = require('webpack-dev-middleware')
const webpackhot = require('webpack-hot-middleware')
const webpack = require('webpack')
const commonfig = require("./webpack.common.js")
const devfig = require("./webpack.dev.js")
const merge = require('webpack-merge')
// 指定基础配置的开发环境，也就是env
const devcommon = commonfig('development')
// 合并配置
const config = merge(devcommon, devfig)
// 在客户端开启webpack的热更新的代码
Object.keys(config.entry).forEach((name) => {
  config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(config.entry[name])
})

const app = express();
// 生成编译结果
const complier = webpack(config)
// 以开发模式进行
app.use(webpackDevMid(complier, {}))
// 以热更新的方式进行开发
app.use(webpackhot(complier, {
  // 对css进行热更新
  overlayStyles: true
}))
// 端口号
app.listen(2007)