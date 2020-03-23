const mysql = require('mysql')
const co = require('co-mysql')
const config = require('../config')
const dbConfig = config.DB
const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.NAME
})
module.exports = co(db)