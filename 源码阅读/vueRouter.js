
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class vueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    // 传递的路由表是数组 需要装换成{'/home':Home,'/about',About}格式
    this.routesMap = this.createMap(this.routes);
    // 路由中需要存放当前的路径  需要状态
    this.history = new HistoryRoute;
    this.init();//开始初始化操作
  }
  init() {
    if (this.mode == 'hash') {
      // 先判断用户打开时有没有hash，没有就跳转到#/
      location.hash ? '' : location.hash = '/';
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      })
    } else {
      location.pathname ? '' : location.pathname = '/';
      window.addEventListener('load', () => {
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname;
      })

    }
  }
  createMap(routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
}
//使用vue.use就会调用install方法
vueRouter.install = function (Vue, opts) {
  if (vueRouter.install.installed) return
  vueRouter.install.installed = true

  //每个组件都有 this.$router / this.$route 所以要mixin一下
  Vue.mixin({
    beforeCreate() { //混合方法
      if (this.$options && this.$options.router) {//定位跟组件
        this._root = this;//把当前实例挂载在_root上
        this._router = this.$options.router // 把router实例挂载在_router上
        //history中的current变化也会触发
        Vue.util.defineReactive(this, 'current', this._router.history);
      } else {
        // vue组件的渲染顺序  父 -> 子 -> 孙子

        this._root = this.$parent._root;
        //获取唯一的路由实例
      }
      Object.defineProperty(this, '$router', {//Router的实例
        get() {
          return this._root._router;
        }
      });
      Object.defineProperty(this, '$route', {
        get() {
          return {
            //当前路由所在的状态
            current: this._root._router.history.current
          }
        }
      })
    }
  });
  // 全局注册 router的两个组件

  Vue.component('router-view', {//根据当前的状态 current 对应相应的路由
    render(h) {
      //将current变成动态的 current变化应该会影响视图刷新
      //vue实现双向绑定 重写Object.defineProperty
      let current = this._self._root._router.history.current;
      console.log(current);
      let routeMap = this._self._root._router.routesMap
      return h(routeMap[current])
    }
  })
}
export default vueRouter;
