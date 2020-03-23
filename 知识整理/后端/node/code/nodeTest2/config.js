const config = {
  URL_PATH: 'http://localhost:3000',
  DB: {
    HOST: '106.54.210.212',
    USER: 'root',
    PASSWORD: 'root',
    NAME: 'user'
  }
}

module.exports = new Proxy(config, {
  set: () => {},// 防止被修改
  deleteProperty: () => {}// 防止被删除
})