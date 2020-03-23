# utils.js

- 设置静态文件的公共路径，用于修改src属性的值
- css加载器的相关配置
- 对.vue文件之外的css文件或css预处理器文件进行处理

``` javascript
var path = require('path')
var config = require('../config')
// 抽取css样式，合并css
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 设置静态文件的公共路径，用于修改src属性的值（通常用于某个loader的options）
exports.assetsPath = function(_path) {
  // 根据不同的环境到对公共路径进行配置并与传入的文件名称进行合
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
// cssLoader相关配置
exports.cssLoaders = function(options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否进行css压缩
      minimize: process.env.NODE_ENV === 'production',
      // 是否生成sourceMap用于调试
      sourceMap: options.sourceMap
    }
  }

  // 加载常用的sass等之类的css扩展语言的loader
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      // 如果有名称则根据名称加载相应的loader
      loaders.push({
        loader: loader + '-loader',
        // 将css加载器初始配置与特殊配置合并
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 是否将入口文件（main.js）中引入的css文件一起打包进该文件的css中
    // 根据传入的options.extract的值进行判断（一般在生产环境中会去单独打包）
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 对.vue文件之外的css文件或css预处理器文件进行处理
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
      var loader = loaders[extension]
      output.push({
          test: new RegExp('\\.' + extension + '),
            use: loader
          })
      }
      return output
    }
```

