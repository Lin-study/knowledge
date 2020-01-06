const Router = require('koa-router')
const router = new Router()
router.get('/login', async ctx =>{
  await ctx.render('admin/login', {
    PATH: ctx.config.URL_PATH
  })
})
router.post('/login', async ctx => {
  const { userName, passWord } = ctx.request.body
})
module.exports = router.routes()