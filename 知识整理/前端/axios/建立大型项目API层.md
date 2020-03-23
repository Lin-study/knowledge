# 目录结构解释

> 详情请看code下的代码

- server.js 通过node启动的服务使访问可以执行
- src 存放api层代码
  - api
    - index.js 接口整合
    - login.js 登录接口对象
    - shop.js 商品接口对象
  - components
    - HelloWorld.vue 调用axios
  - request
    - getrequest.js 对axios进行二次封装
    - server.js 通过axios创建实例，和相关拦截器
  - main.js 将axios给到vue实例