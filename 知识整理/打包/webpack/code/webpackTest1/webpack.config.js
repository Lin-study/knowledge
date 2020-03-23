// 将css合并到一起 miniCssPlugin和 extractTextPlugin相比除了配置不一样，可以添加hash参数之外其他都一样
const extractTextPlugin = require('extract-text-webpack-plugin')
const miniCssPlugin = require('mini-css-extract-plugin')
// 以某个html文件为模板将引入的js和css自动添加到模板功能上去
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpackSpriteSmith = require('webpack-spritesmith')
const path = require('path')

const getCssOpt = (arr) => {
  let config = [{
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          // 自动添加兼容性前缀
          require('autoprefixer')(),
          // 使用下一代css
          require('postcss-cssnext')(),
          // 使用雪碧图
          require('postcss-sprites')()
        ]
      }
    }
  ]
  if (Array.isArray(arr)) config = config.concat(arr)
  // return extractTextPlugin.extract({
  //   fallback: {
  //     loader: 'style-loader'
  //   },
  //   use: config
  // })
  return [{
    loader: miniCssPlugin.loader
  }].concat(config)
}


module.exports = {
  // 模式 可选为 development（开发模式） production（压缩模式）
  mode: "development",
  /*
    入口
    以key值为文件名称进行js打包，中括号代表要打包的入口文件，如果只打包一个文件可以使用字符串代替
  */
  entry: {
    main: ['./main.js'],
    main2: './main2.js'
  },
  /*
    输出文件名称 ./[name].js
        携带hash值 ./[name].[hash].js
        截取hash值 ./[name].[hash:4].js
  */
  output: {
    filename: "./[name].js"
  },
  // loader用于对某种文件的处理，例如css，ts，图片
  module: {
    rules: [
      // 添加针对js的编译（需要添加js的loader，js的核心编译库，编译标准，es6的功能兼容）
      /**
       * babel-poyfill 将所有的关于功能实现的代码都打包进去
       * babel-runtime 用到了那些就将那些代码打包进去
       */
      {
        test: /\.js$/,
        use: [{
            loader: './myloader'
          },
          {
            // 添加编译的标准，可以放到根目录下的 .babelrc 文件下
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: getCssOpt()
      },
      {
        test: /\.less$/,
        use: getCssOpt([{
          loader: 'less-loader'
        }])
      },
      {
        test: /\.sass$/,
        use: getCssOpt([{
          loader: 'sass-loader'
        }])
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          // 可以使用url-loader （url-loader包含了file-loader）
          loader: 'file-loader',
          options: {
            // 生成的文件名称
            name: '[name].[hash:4].[ext]',
            // 生成文件在dist中的路径
            outputPath: 'assets',
            // 生成文件在引用中的路径
            publicPath: 'assets',
            // 当图片的大小低于这个时就会转换成base64的字符串（单位KB）
            limit: 5000
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          // 可以使用url-loader （url-loader包含了file-loader）
          loader: 'img-loader',
          options: {
            plugins: [
              // 图片压缩(png)
              require('imagemin-pngquant')({
                speed: 2
              }),
              // jpeg压缩
              require('imagemin-mozjpeg')({
                speed: 20
              }),
              // gif压缩
              require('imagemin-gifsicle')({
                speed: 2
              })
            ]
          }
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            // 针对需要特殊处理的自定义属性
            // attrs: [
            //   'img:data-src'
            // ]
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff)/,
        use: {
          loader: 'file-loader',
          options: {
            // 生成的文件名称
            name: '[name].[hash:4].[ext]',
            // 生成文件在dist中的路径
            outputPath: 'assets/font',
            // 生成文件在引用中的路径
            publicPath: 'assets/font'
          }
        }
      }
    ]
  },
  // 添加某些扩展功能（插件）
  plugins: [
    // new extractTextPlugin({
    //   filename: '[name].min.css'
    // })
    new miniCssPlugin({
      filename: '[name].min.css'
    }),
    new htmlWebpackPlugin({
      // 以那些文件为模板
      template: 'index.html',
      // 生成的html文件
      filename: 'index.html',
      // 引入指定的js文件，名称是入口的key
      chunks: ['main']
    }),
    // new webpackSpriteSmith({
    //   src: {
    //     // 图片来源的文件夹
    //     cmd: Path2D.join(__dirname, './img'),
    //     // 处理的图片
    //     glob: '*.jpg'
    //   },
    //   // 打包的位置
    //   target: {
    //     iamge: path.join(__dirname, 'dist/sprites/sprite.png'),
    //     css: path.join(__dirname, 'dist/sprites/sprite.css')
    //   },
    //   apiOptions: {
    //     cssImageRef: './sprites/sprite.png'
    //   }
    // })
  ]
}