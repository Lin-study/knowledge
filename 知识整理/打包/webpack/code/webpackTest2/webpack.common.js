const dev = require('./webpack.dev.js');
const pro = require('./webpack.prod.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var minicss = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
module.exports = env => {
  //配置对象
  function getcssoptions(env) {
    if (env === 'production') {
      return {
        test: /\.css$/,
        use: [{
            loader: minicss.loader,
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    } else {
      return {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    }
  }
  var common = {
    entry: {
      app: "./src/main.js",
      app2: "./src/main2.js"
    },
    output: {
      filename: '[name].js'
    },

    module: {
      rules: [
        //js处理
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          }
        },
        //css处理
        getcssoptions()
      ]
    },
    plugins: [
      //提取额外css文件
      new minicss({
        filename: '[name].min.css'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        minify: {
          collapseWhitespace: true
        },
        inject: true,
      }),
    ]
  };
  //返回配置对象
  return merge(env === 'production' ? pro : dev, common);
}