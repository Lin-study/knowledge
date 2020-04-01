# 简介

因为 HTTP 是一个无状态的协议，每次请求都是独立的，无关的，但是有时候需要保存一些状态，所以引入了 Cookie

内部以键值对的形式存放，在同一域名下发送请求，就会在链接上携带 Cookie，服务器拿到后进行解析，便能获取到客户端的状态

服务端可以通过响应头的 Set-Cookie 字段来对客户端写入 Cookie

## 生存周期

Cookie 的有效期可以通过 Expires 和 Max-Age 两个属性来设置

* Expires 是过期时间
* Max-age 一段时间间隔，从浏览器接收到斑纹开始计算

当 Cookie 过期，Cookie 会被删除

## 安全

如果带上Secure，说明只能通过 HTTPS 传输 cookie。

如果 cookie 字段带上HttpOnly，那么说明只能通过 HTTP 协议传输，不能通过 JS 访问，这也是预防 XSS 攻击的重要手段。

相应的，对于 CSRF 攻击的预防，也有SameSite属性。
SameSite可以设置为三个值，Strict、Lax和None。

* 在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求sanyuan.com网站只能在sanyuan.com域名当中请求才能携带 Cookie，在其他网站请求都不能。
* 在Lax模式，就宽松一点了，但是只能在 get 方法提交表单况或者a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。
* 在None模式下，也就是默认模式，请求会自动携带上 Cookie。

## 缺点

* 大小： Cookie 的体积上线只有 4 KB
* 性能： 不管网站是否需要这个 Cookie ，请求都会携带完整的 Cookie （但是可以通过 Domain 和 path 指定作用域来解决）
* 安全： 由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获。另外，在HttpOnly为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

