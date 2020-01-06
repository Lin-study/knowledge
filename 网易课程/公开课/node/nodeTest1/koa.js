const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/login',ctx => {
  ctx.body = '登录页面'
})

router.get('/page', ctx => {
  console.log(ctx)
})
app.use(router.routes())
app.listen(3000)