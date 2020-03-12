// 处理promise错误
// const [err, data] = await awaitWrap(fetchData())
// console.log('err', err)
// console.log('data', data)
const awaitWrap = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null])
}
