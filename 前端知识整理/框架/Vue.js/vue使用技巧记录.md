# 技巧

## require.context

利用 webpack 的 api 来实现自动化导入模块，[自动加载路由](../../webpack/自动加载路由（添加页面后，不再更新路由）.md)

``` JS
const files = require.context('@/components', true, /^\.\/(\w*\/)+index\.(vue|js)$/) // 从 components 文件夹下引入以index.vue 以及 index.js 结尾的组件

export default {
  // 自定义组件会直接执行对象中的 install 方法
  install(Vue) {
    files.keys().forEach((path) => {
      const type = this.typeof(path, files(path))
      // 针对3中不同的组件设计模式提供不同的组件注册策略
      switch (type) {
        case 'component':
          this.installComonent(Vue, files(path));
          break;
        case 'componentGroup':
          this.instalGroupComponent(Vue, files(path));
          break;
        case 'serveApi':
          this.installServeApi(Vue, files(path));
          break;
      }
    })
  },
  typeof(path, file) {
    if (path.lastIndexOf('.js') === -1) {
      return 'component'
    } else {
      if (file.default.install) {
        return 'serveApi'
      } else {
        return 'componentGroup'
      }
    }
  },
  instalGroupComponent(Vue, file) {
    const components = file.default
    Object.keys(components).forEach((name) => {
      Vue.component('Nb' + name, components[name])
    })
  },
  installComonent(Vue, file) {
    const options = file.default
    const name = options.name
    Vue.component('Nb' + name, options)
  },
  installServeApi(Vue, file) {
    Vue.use(file.default)
  }
}
```

##  Vue.filter  全局过滤器

```
// 使用
// 在双花括号中
{{ message | capitalize }}
// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>
// 局部注册
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
// 全局注册
Vue.filter('stampToYYMMDD', (value) =>{
  // 处理逻辑
})
```
