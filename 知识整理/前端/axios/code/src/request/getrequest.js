import server from './server.js';
import qs from 'qs';
// 序列化模块  qs({a:1,b:2}) => '?a=1&b=2'
function myserver() {
  this.server = server;
}
/**
 * @description 路由解析（api请求注入）
 * @param name 路由模块名称
 * @param urlOb 路由对象
 */
myserver.prototype.parseRouter = function (name, urlOb) {
  var ob = this[name] = {};
  Object.keys(urlOb).forEach((item) => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
    this[name][item].state = 'ready';
  })
}

/**
 * @description 发送请求
 * @param moduleName 路由模块名称
 * @param name 路由名称
 * @param url 路由地址
 * @param config 路由配置（用来绑定到）
 */
myserver.prototype.sendMes = function (moduleName, name, url, config) {
  var config = config || {};
  // var bindName = config.bindName || name;
  var type = config.type || 'get';
  var data = config.data || {};
  var self = this;
  var before = function (mes) {
    self[moduleName][name].state = 'ready';
    return mes;
  }
  var success = config.success;
  var callback = function (res) {
    (success && typeof success === 'function') && success(res);
  }
  var state = {
    get: function () {
      var urlqs = url + "?" + qs.stringify(data);
      server.get(urlqs).then(before).then(callback);
    },
    post: function () {
      server.post(url, data).then(before).then(callback);
    }
  }
  // 避免重复执行
  if (self[moduleName][name].state === 'ready') {
    self[moduleName][name].state = 'pending';
    state[type]();
  }
}
export default new myserver;


/**
 * @description 发送请求（直接将数据绑定到vue对象中）
 * @param moduleName 路由模块名称
 * @param name 路由名称
 * @param url 路由地址
 * @param config 路由配置（用来绑定到）
 */
myserver.prototype.sendMes = function (moduleName, name, url, config) {
  var config = config || {};
  var bindName = config.bindName || name;
  var type = config.type || 'get';
  var data = config.data || {};
  var self = this;
  var before = function (mes) {
    self[moduleName][name].state = 'ready';
    return mes;
  }
  var defaultFn = function (mes) {
    self.nowhandle[bindName] = mes;
  }
  var callback = function (res) {
    success(res, defaultFn);
  }
  var success = config.success || defaultFn;
  var state = {
    get: function () {
      var urlqs = url + "?" + qs.stringify(data);
      server.get(urlqs).then(before).then(callback);
    },
    post: function () {
      server.post(url, data).then(before).then(callback);
    }
  }
  if (self[moduleName][name].state == 'ready') {
    self[moduleName][name].state = 'pending';
    state[type]();
  }
}



