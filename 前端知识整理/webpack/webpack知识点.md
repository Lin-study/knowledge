# 当运行npm run build时发生了什么

当执行npm run build之后，会通过node去运行build.js，在build.js中使用webpack.pro.js进行打包
打包的时候会先于webpack.base.js合并（获取基础配置）并且获取congfig里的index.js和pro.env.js里面的变量

![](img/webpack-build详解.png)

