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
