# async和await

> async返回的是一个Promise

``` JavaScript
// 求值
let a = await 100 * 100 // a=>10000
// 阻塞线程（读取资源，文件，http，操作数据库）
let a = await axios.get('http://taobao.com') // 此方法下的带啊吗块，会在返回结果后再执行
```