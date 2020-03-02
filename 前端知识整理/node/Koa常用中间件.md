# 中间件

## 介绍

* koa-body： 是 koa-body 和 koa-multer 的结合
* koa-bodyparser: 处理post请求
* koa-multer： 处理图片上传（koa-multer和koa-router存在不兼容问题）
* koa-parmeter： 用于参数校验
* koa-static： 为网站提供静态资源
* mongoose： 链接数据库

## 使用

``` JS
  const koaBody = require('koa-body');
  const error = require("koa-json-error");
  const app = new koa();

  /*****************        koa-body          ********************************/

  app.use(koaBody({
    multipart: true, // 支持文件上传, 是否支持 multipart-formdate 的表单	Boolean	false
    encoding: 'gzip', // 表单的默认编码	String	utf-8
    // patchNode:	将请求体打到原生 node.js 的ctx.req中	Boolean	false
    // patchKoa	将请求体打到 koa 的 ctx.request 中	Boolean	true
    // jsonLimit	JSON 数据体的大小限制	String / Integer	1mb
    // formLimit	限制表单请求体的大小	String / Integer	24kb
    // textLimit	限制 text body 的大小	String / Integer	23kb
    // urlencoded	是否支持 urlencoded 的表单	Boolean	true
    // formidable	配置更多的关于 multipart 的选项	Object	{}
    // onError	错误处理	Function	function(){}
    // stict	严格模式,启用后不会解析 GET, HEAD, DELETE 请求	Boolean	true
    formidable: {
      uploadDir: path.join(__dirname, 'public/uploads'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
      },
      // maxFields	限制字段的数量	Integer	500
      // hash	如果要计算文件的 hash，则可以选择 md5/sha1	String	false
      // multipart	是否支持多文件上传	Boolean	true
    }
  }));
  /*****************        koa-parameter          ********************************/
  const parameter = require("koa-parameter");
  app.use(parameter(app));
  // 使用
  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: "string",
        required: true
      },
      password: {
        type: "string",
        required: true
      }
    });
    ...
  }
  /*****************        koa-static          ********************************/
  const koaStatic = require("koa-static");
  app.use(koaStatic(path.join(__dirname, "public")));
  /*****************        mongoose          ********************************/
  const mongoose = require("mongoose");
  mongoose.connect(
    connectionStr, // 数据库地址
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    () => console.log("mongodb 连接成功了！")
  );
  mongoose.connection.on("error", console.error);
```

