# dev-client.js

* 引入eventsource-polyfill模块
* 监听dev-server.js中webpack-hot-middleware发布的事件并作相应的处理

``` javascript
/**
 *  用于在客户端开启热更新
 */

/* eslint-disable */
// 用来实现客户端的eventSource，用于和服务器双向通讯
require('eventsource-polyfill')
// 在客户端开启热更新
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 监听dev-server.js中webpack-hot-middleware发布的事件，当event.action为reload的时候重新刷新页面
hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
```

