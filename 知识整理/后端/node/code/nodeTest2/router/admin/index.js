const Router = require('koa-router')
const md5 = require('md5-node')
const router = new Router()
router.get('/login', async ctx =>{
  await ctx.render('admin/login', {
    PATH: ctx.config.URL_PATH
  })
})
router.post('/login', async ctx => {
  let { userName, passWord } = ctx.request.body
  passWord = md5(passWord)
  let data = await ctx.db.query(`select user, password from admin where user = '${userName}' and password = '${passWord}'`)
  if (data.length > 0) {
    ctx.body = '登陆成功'
  } else {
    ctx.body = '登陆失败'
  }
})
module.exports = router.routes()