``` JS
var test = {
  testa: 1
}

let a = {
  install: function(vue) {
    // 将test进行双向绑定
    vue.util.defineReactive(test, 'testa')
    vue.mixin({
      // data中return的对象中的所有数据均可以在任意的vue文件中获取（数据全局混入）
      data: function() {
        return {
          a: 123
        }
      },
      methods: {
        // 公用的方法（方法的全局混入）
      },
      beforeCreate: function() {
        this.test = test
      },
      // 混入生命周期(所有组件的created的生命周期中都会触发created的函数)
      created: function() {}
    })
  }
}
// 如果传入的是个方法并且方法中没有携带install时会执行此方法
// 如果可以通过点install访问到一个方法时，会执行此方法
Vue.use(a)
```

