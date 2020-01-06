const Koa = require('koa')
const Router = require('koa-router')
const ejs = require('koa-ejs')// 页面模板内容
const path = require('path')// 处理路径问题
const config = require('./config')// 配置文件
const static = require('koa-static')// 处理静态文件
const body = require('koa-body')// 解析请求内容
const error = require('./libs/error')// 错误处理
const app = new Koa()
const router = new Router()
app.use(body())
ejs(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})
Object.assign(app.context, {
  config
})
app.use(error)
// 引入子路由
router.use('/admin', require('./router/admin'))
// 引入路由
app.use(router.routes())
// 引入静态文件
app.use(static(path.resolve(__dirname, './static')))
app.listen(3000, () => {
  console.log('The server is start at port ' + 3000)
})