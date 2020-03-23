# Sequelize

> [sequelize 连接多个数据库生成多个实例](http://www.fangzhenqi.xin/art/nodejs/other/73.html?tdsourcetag=s_pctim_aiomsg)  

## 简介

  将数据库操作变成对象形式的操作，**可以操作很多种的数据库（mysql，monogoDB）**

## 使用方式

``` JS
// 引入
const Sequelize = require('sequelize')
// 链接数据库
const sequelize = new Sequelize('user' /*数据库名称*/ , 'root' /*用户名*/ , 'root' /*密码*/ , {
  dialect: 'mysql', // 链接的数据库
  host: 'localhost', // 访问地址
  pool: { // 连接池
    max: 5, // 最大链接数
    min: 0, // 最小链接数
    idle: 10000 // 空闲时间
  },
  timezone: '+08:00' // 解决时间差
  port: 3306 // 端口号
})
// 链接到数据库
sequelize.authenticate().then(() => {}).catch(err => {})
// 创建model模型
const userModel = sequelize.define('users', {
  // key是字段名称
  id: {
    type: Sequelize.INTEGER(11), // 类型和字段长度
    primaryKey: true, // 是否为主键
    autoIncrement: true, // 是否自增
    allowNull: false // 不可为空
  },
  username: Sequelize.STRING(100)
}, {
  timestamps: false // 是否添加时间戳（在数据中添加开始时间和结束时间）
})

// 添加
userModel.create({
  username: 'lin',
  password: '123456'
}).then(user => {
  console.log(user.id)
})
// 删除
userModel.destroy({
  where: { // 删除
    username: 'lin'
  }
}).then(() => {
  console.log('删除成功')
})
// 修改
userModel.update({
  username: '777'
}, {
  where: {
    username: 'lin'
  }
}).then(() => {
  console.log('修改成功')
})
// 查询
userModel.findAll() // 查询所有，返回的是一个数组
userModel.findOne({ // 查询单个，返回的是一个对象
  where: {
    username: 'lin'
  }
}).then(res => {})
```

