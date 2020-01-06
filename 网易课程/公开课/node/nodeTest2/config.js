const config = {
  URL_PATH: 'http://localhost:3000'
}

module.exports = new Proxy(config, {
  set: () => {},// 防止被修改
  deleteProperty: () => {}// 防止被删除
})