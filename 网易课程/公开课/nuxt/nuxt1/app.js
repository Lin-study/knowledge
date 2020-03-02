const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs')
const path = require('path')
const vueRender = require('vue-server-renderer').createRenderer()
const Vue = require('vue')

const app = new Koa
const router = new Router()
render(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})
router.get('/', async ctx => {
  await ctx.render('index', {
    from: 'this is koa render',
    list: [{
      name: '实现 koa 服务端的渲染',
      over: true
    }, {
      name: 'vue-server-renderer 的使用',
      over: false
    }, {
      name: '安装 Nuxt 并熟悉 nuxt 的目录架构',
      over: false
    }],
    html:''
  })
})

const vm = new Vue({
  data: {
    from: 'This is from vue-server-render'
  },
  template: `
    <div>
      <h1>{{from}}</h1>
    </div>
  `
})

router.get('/vue', async ctx => {
  const html = await vueRender.renderToString(vm)
  await ctx.render('index', {
    from: 'this is koa render',
    list: [{
      name: '实现 koa 服务端的渲染',
      over: true
    }, {
      name: 'vue-server-renderer 的使用',
      over: true
    }, {
      name: '安装 Nuxt 并熟悉 nuxt 的目录架构',
      over: false
    }],
    html
  })
})
app.use(router.routes())
app.listen(3000)