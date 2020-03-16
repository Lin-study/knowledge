const fs = require('fs')
const path = require('path')

const Rep = new RegExp(/《(.*?)》/)

const getdir = function (dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function (filename) {
    if (Rep.test(filename)) {
      console.log(path.join(dir, Rep.exec(filename)[1] + path.extname(filename)))
      fs.rename(path.join(dir, filename).toString(), path.join(dir, Rep.exec(filename)[1] + path.extname(filename)).toString(), (err) => {
        if (err) console.error(err)
        console.log(filename + '改名成功')
      })
    }
  });
}
getdir('./备')