// http模块，用于建立服务
const http = require('http')
// 用于读取和写入文件
const fs = require('fs')
// 用于parse--get请求的参数
const url = require('url')
// 用于处理post请求参数
const querystring = require('querystring')

let strateComp = {
  '/user': {},
  '/login': {}
}

const app = http.createServer((request, respones) => {
  if (request.method === 'GET') {
    const url = request.url
    // 处理get请求
    // 处理文件
  } else {
    // 处理post请求
  }
})

app.listen(3000)