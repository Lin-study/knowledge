module.exports = async function(ctx, next) {
  try {
    await next()
  } catch (error) {
    console.log({
      error: '服务器出错',
      message: error.message
    })
  }
}