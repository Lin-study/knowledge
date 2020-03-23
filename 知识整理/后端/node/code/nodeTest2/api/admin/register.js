const Router = require('koa-router')
const md5 = require('md5-node')
const axios = require('axios')
const querystring = require('querystring')
const router = new Router()

router.post('/register', async ctx => {
  let {
    userName,
    passWord
  } = ctx.request.body
  // 先查询是否存在该用户
  passWord = md5(passWord)
  let data = await ctx.db.query(`select user from admin where user = '${userName}'`)
  if (data.length > 0) {
    return ctx.body = {
      code: 200,
      message: '用户名已存在'
    }
  }
  // 如果不存在，则新加用户
  data = await ctx.db.query(`INSERT INTO admin (user, password) VALUES ('${userName}', '${passWord}')`)

  if (data && data.affectedRows) {
    return ctx.body = {
      code: 200,
      message: '新建用户成功'
    }
  } else {
    return ctx.body = {
      code: 200,
      message: '新建用户失败，请重试'
    }
  }
})

router.post('/reg', async ctx => {
  let { userName, passWord } = ctx.request.body
  if (!userName || !passWord) {
    return ctx.body = {
      code: 200,
      message: '用户名和密码不可为空'
    }
  }
  let { data } = await axios({
    url: 'http://106.54.210.212/api/v1/user/register.php',
    method: 'post',
    data: {
      username: userName,
      password: passWord
    },
    transformRequest: [
      data => querystring.stringify(data)
    ]
  })
  if (data) {
    if (data.code === 0) {
      return ctx.body = {
        code: 200,
        message: '用户名已存在'
      }
    } else if (data.code === 1) {
      return ctx.body = {
        code: 200,
        message: '新建用户成功'
      }
    }
  }
})

module.exports = router.routes()