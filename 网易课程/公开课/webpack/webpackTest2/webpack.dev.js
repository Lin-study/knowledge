const webpack = require('webpack')
// express + webpack-dev-middleware + webpack-hot-middleware
module.exports = {
  mode: 'development',
  // 为了调试方便，添加source-map可以定位到错误地方
  devtool: 'cheap-module-source-map',
  devServer: {
    // 代理接口
    port: 9000,
    // 开启热更新
    hot: true,
    // 只开启热更新,不适用live-reload
    // hotOnly: true
    // 开启浏览器
    open: false,
    // 路径重定向(访问的路径没有时，重写路径（用于404）)
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/([ -~]+)/,
          to: (context) => {
            return './404.html'
          }
        }
      ]
    },
    proxy: {
      '/chart': {
        target: 'https://chart.thingjs.com/',
        // 替换请求头部信息（跨域）
        changeOrigin: true,
        pathRewrite: {
          // 可以将123的请求转给456
          '^/123': '/456'
        }
      }
    },
    // 开启错误遮罩
    overlay: false
  },
  plugins: [
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 热加载时直接返回更新文件名，而不是文件的id
    new webpack.NamedModulesPlugin()
  ]
}