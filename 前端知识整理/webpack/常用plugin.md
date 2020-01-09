# DefinePlugin
webpack. DefinePlugin-再打包阶段定义全局变量
（用于区分开发环境和测试环境的区别）
例

``` Javascript
new webpack.DefinePlugin({
  isDev: true
})
// 那么在全局都可以使用isDev
```

# HashedModuleldsPlugin

webpack. HashedModuleldsPlugin--保持module.id稳定（保持某些文件的hash是不变化的）
针对图片或者第三方库的hash不发生变化（叫做长缓存优化）

# NoEmitOnErrorsPlugin

webpack. NoEmitOnErrorsPlugin--屏蔽错误
常用于开发模式下，当开发出现问题时，不会将开发模式退出

# ProvidePlugin

webpack. ProvidePlugin-- 提供库
例

``` Javascript
new webpack.ProvidePlugin({
  $: 'jquery'
})
// 那么在全局都可以使用jquery的函数库了。不需要去污染全局变量
```

# copy-webpack-plugin

copy-webpack-plugin--帮助拷贝内容，例如将static文件夹下的某个文件拷贝到打包目录下

# HtmlWebpackPlugin

依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）

# Hot Module Replacement

热更新

# OccurenceOrderPlugin 

为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID

# UglifyJsPlugin

压缩JS代码

# ExtractTextPlugin

分离CSS和JS文件

