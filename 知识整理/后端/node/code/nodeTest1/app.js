// http模块，用于建立服务
const http = require('http')
// 用于读取和写入文件
const fs = require('fs')
// 用于parse--get请求的参数
const url = require('url')
// 用于处理post请求参数
const querystring = require('querystring')

let strateComp = {
  '/user': {
    handle: function() {
      console.log('访问用户页面')
    }
  },
  '/login': {
    handle: function() {
      console.log('访问登录页面')
    }
  },
  '/': {
    handle: function() {
      console.log('访问根目录')
    }
  }
}

const app = http.createServer((request, respones) => {
  if (request.method.toUpperCase() === 'GET') {
    const { path, query, pathname} = url.parse(request.url, true)
    let requestHandle = strateComp[pathname]
    if (requestHandle) {
      // 处理get请求
      console.log(query)
      requestHandle.handle(query)
    } else {
      // 处理文件
      fs.readFile(`./page${path}`, (err, buffer) => {
        if (err) {
          respones.write('this page is not find')
        } else {
          respones.write(buffer)
        }
        respones.end()
      })
    }
  } else {
    // 处理post请求
    let arr = []
    request.on('data', (data) => {
      arr.push(data)
    })
    request.on('end', () => {
      let buffer = Buffer.concat(arr)
      console.log(buffer.toString())
      let post = querystring.parse(buffer.toString())
      console.log(post)
    })
  }
})

app.listen(3000)