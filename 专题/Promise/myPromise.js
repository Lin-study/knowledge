/**
 * 1. 创建结构
 * 2. 创建构造函数（promise 状态，promise回调函数）
 * 3. 构建失败和成功的回调函数（当状态被改变的时候不会执行）
 * 4. 执行函数异常捕获
 * 
 * then
 * 1. 如果是pending状态
 * 2. 如果已经是失败或者成功
 * 3. 返回一个新的 promise 对象
 *    1. 如果抛出异常，return 的 promise 就会失败， reason 就是 error
 *    2. 如果回调函数返回的不是 promise，return 的 promise 就会成功，value 就是返回的值
 *    3. 如果返回的是 promise 新的promise的状态就是返回的 promise 状态
 */

// class版
(function(window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  class myPromise {
    constructor(task) {
      // 初始化状态
      this.status = PENDING
      this.callbacks = []
        // 执行成功的回调函数
      function onResolve(value) {
        if (this.status !== PENDING) return
        setTimeout(() => {
          this.status = RESOLVED
          this.callbacks.forEach(callback => {
            const resolve = callback.resolve
            if (typeof resolve === 'function') resolve(value)
          })
        })
      }
      // 执行失败的回调函数
      function onReject(reason) {
        if (this.status !== PENDING) return
        setTimeout(() => {
          this.status = REJECTED
          this.callbacks.forEach(callback => {
            const reject = callback.reject
            if (typeof reject === 'function') reject(reason)
          })
        })
      }
      onResolve = onResolve.bind(this)
      onReject = onReject.bind(this)
      try {
        task(onResolve, onReject)
      } catch (error) {
        onReject(error)
      }
    }
    then(resolve, reject) {
      this.callbacks.push({resolve, reject})
    }
    catch (reject) {

    }
  }
  myPromise.all = () => {

  }
  window.myPromise = myPromise
})(window)