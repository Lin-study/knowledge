
# vue-loader.conf.js

- 根据当前的开发环境对webpack中的vue-loader进行配置

``` javascript
var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 配置在.vue文件中的css相关处理规则
  loaders: utils.cssLoaders({
    // 根据所处环境是否生成sourceMap用于代码调试
    sourceMap: isProduction ?
      config.build.productionSourceMap :
      config.dev.cssSourceMap,
    // 是否将单独的css文件（一般为引入的外部文件）进行提取单独打包
    extract: isProduction
  })
}
```

