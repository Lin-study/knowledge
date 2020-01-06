module.exports = (context) => {
  return context.replace(/console\.log\(.*?\);?$/, '')
}