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

