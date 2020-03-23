# dev.env.js

* 将NODE_ENV设置为开发模式

``` JS
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
```

