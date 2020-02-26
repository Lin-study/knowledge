# 开启 gzip 压缩

以 express 为例

* 安装 npm install compression --save
* 添加代码逻辑  

  var compression = require('compression'); 
  var app = express(); app.use(compression())

* 重启服务，观察网络面板里面的 response header，Content-Encoding: gzip 则为开启成功

# 浏览器缓存

为了提高用户加载页面的速度，对静态资源进行缓存是非常必要的，根据是否需要重新向服务器发起请求来分类，将 HTTP 缓存规则分为两大类（强制缓存，对比缓存）

# CDN 的使用

浏览器从服务器下载资源文件，因网络问题，网页就半天反应不过来。而 CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且 CDN 具有更好的可用性，更低的网络延迟和丢包率 。

