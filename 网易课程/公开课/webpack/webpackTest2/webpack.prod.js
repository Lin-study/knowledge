module.exports = {
  mode: 'production',
  optimization: {
    // 开启代码压缩
    minimize: false,
    splitChunks: {
      // 可选 async(只对异步代码打包)，all(对同步代码打包)，initial（针对所有代码打包）
      chunks:'initial',
      // 更改文件中名称链接的字符串
      automaticNameDelimiter: '.',
      // 多入口提取公共组件使用，大小默认时30KB
      minSize: 0,
      // 引用次数（多入口）
      minChunks: 1,
      // 自定义打包规则
      cacheGroups: {
        vendors: {
          test: /jquery/,
          priority: -10
        }
      }
    },
    // 打包webpack代码使用
    runtimeChunk: {
      // 更改打包后的名称
      name: 'runtime'
    }
  }
}