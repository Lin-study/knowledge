# DLL优化--优化打包速度

> 因为第三方包是不会发生变化的，但是webpack每次打包，还是要去处理第三方包

思路： 先处理第三方包，然后再打包

``` javascript
// webpack.dll.js
cosnt webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['jquery', 'loadsh']
  },
  output: {
    path: __dirname + "/dll",
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DLLPlugin({
      path: __dirname + '/dll/[name]-manifest.json'
      name: '[name]_library'
    })
  ]
}

// webpack.config.js
// ...
plugins: [
  new webpack.DLLReferencePlugin({
    manifest: require('./dll/vendor-manifest.json')
  })
]
// ...
```

# Happypack

# 对图片进行压缩

除了可以在 webpack.base.conf.js 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式，其余的不做操作。

所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 image-webpack-loader来压缩图片

``` JS
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
```

# 减少 ES6 转为 ES5 的冗余代码

从ES6 转换成ES5 时，会添加辅助函数，如果多个代码都依赖这些辅助函数，那么这些辅助函数的代码将会出现很多次。

为了不让代码重复，使用 babel-plugin-transform-runtime 插件。

``` 
// 安装 babel-plugin-transform-runtime ：
npm install babel-plugin-transform-runtime --save-dev
// 修改 .babelrc  配置文件为：
plugins: [transform-runtime]
```

# 提取公共代码 (CommonsChunkPlugin)

``` JS
// 所有在 package.json 里面依赖的包，都会被打包进 vendor.js 这个文件中。
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function(module, count) {
    return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
  }
}),
```

# 提取组件的 CSS

当使用单文件组件时，组件内的 CSS 会以 style 标签的方式通过 JavaScript 动态注入。这有一些小小的运行时开销，如果你使用服务端渲染，这会导致一段 “无样式内容闪烁 (fouc) ” 。将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存。

