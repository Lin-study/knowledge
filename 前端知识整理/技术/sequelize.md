# Sequelize

> [sequelize 连接多个数据库生成多个实例](http://www.fangzhenqi.xin/art/nodejs/other/73.html?tdsourcetag=s_pctim_aiomsg)  

## 简介

  将数据库操作变成对象形式的操作，**可以操作很多种的数据库（mysql，monogoDB）**

## 使用方式

``` JS
// 引入
const Sequelize = require('sequelize')
// 链接数据库
const sequelize = new Sequelize('user', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
})
// 链接到数据库
sequelize.authenticate().then(() => {
}).catch(err => {
})
// 创建model模型
const userModel = sequelize.define('users', {

})
```

