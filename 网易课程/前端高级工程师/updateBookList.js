const fs = require('fs')
const path = require('path')
const rm = require('rimraf')

let list = []

const getdir = function (dir, list) {
  var files = fs.readdirSync(dir);
  files.forEach(function (filename) {
    if (filename === 'img') return
    var fullname = path.join(dir, filename);
    var stats = fs.statSync(fullname);
    let item = {
      filename,
      path: fullname,
      size: stats.size
    }
    if (stats.isDirectory()) {
      item.child = []
      getdir(fullname, item.child)
    }
    list.push(item)
  });
}
getdir('./', list)
// 删除目录
let hasBook = false
if (fs.existsSync('./booklist.md')) {
  console.log('Removing booklist.md');
  hasBook = true
  rm('./booklist.md', (err) => {
    if (err) throw err
    baseBook.writeBook()
  });
}
let string = '# 目录\n'
// 生成md文件
const baseBook = {
  arr: ['*', '+', '-'],
  getIdent(index, maxIndex) {
    if (!maxIndex) maxIndex = index
    if (index >= 3) return this.getIdent(index - 3, maxIndex)
    return ''.padStart(maxIndex * 2) + this.arr[index]
  },
  createBookList(list, index) {
    let ident = this.getIdent(index)
    list.forEach(item => {
      string += `${ident} [${item.filename}](./${item.path})\n`
      if (item.child) {
        this.createBookList(item.child, index + 1)
      }
    })
  },
  writeBook() {
    this.createBookList(list, 0)
    fs.writeFile('./booklist.md', string, (err) => {
      if (err) throw err
      console.log('文件写入成功')
    })
  }
}
if (!hasBook) {
  baseBook.writeBook()
}
