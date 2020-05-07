const defauleConfig = {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  gColor: '#bdb7b7',
  bColor: 'white',
  lColor: 'black',
  size: 10000,
  time: 100,
  diff: 10
}

function PerformanceChart(opt = {}) {
  this.memoryList = []
  this.opt = Object.assign({}, defauleConfig, opt)
  const canvas = this.initCanvas()
  this.ctx = canvas.getContext('2d')
  setInterval(this.openMemory.bind(this), this.opt.time)
  document.body.append(canvas)
}
const PerformanceChartPro = PerformanceChart.prototype

PerformanceChartPro.initCanvas = function() {
  const { x, y, w, h } = this.opt
  const canvas = document.createElement('canvas')
  Object.assign(canvas.style, {
    'z-index': 9999,
    position: 'absolute',
    top: x + 'px',
    left: y + 'px'
  })
  canvas.width = w
  canvas.height = h
  return canvas
}

PerformanceChartPro.drawGrid = function() {
  const { w, h, gColor, diff } = this.opt
  const ctx = this.ctx
  const repeat = Math.min(w, h) / diff
  ctx.strokeStyle = gColor
  let x = 0
  let y = 0
  ctx.beginPath()
  for (let i = 0; i <= repeat; i++) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    x += diff
    y += diff
  }
  const diffRepeat = parseInt(w - h) / diff
  if (w - h > 0) {
    for (let i = 0; i <= diffRepeat; i++) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      x += diff
    }
  } else {
    for (let i = 0; i <= diffRepeat; i++) {
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      y += diff
    }
  }
  ctx.stroke()
}

PerformanceChartPro.drawBg = function() {
  const { w, h, bColor } = this.opt
  this.ctx.fillStyle = bColor
  this.ctx.fillRect(0, 0, w, h)
}
PerformanceChartPro.clearReact = function() {
  const { w, h } = this.opt
  this.ctx.clearRect(0, 0, w, h)
}
PerformanceChartPro.openMemory = function() {
  this.clearReact()
  this.drawBg()
  this.drawGrid()
  const { totalJSHeapSize, usedJSHeapSize } = performance.memory
  if (this.memoryList.length > this.opt.size) this.memoryList.shift()
  this.memoryList.push(usedJSHeapSize / totalJSHeapSize)
  const list = this.memoryList
  const { w, h, size, lColor } = this.opt
  const diff = w / size
  let portX = 0
  const ctx = this.ctx
  ctx.strokeStyle = lColor
  ctx.beginPath()
  for (let i = 0; i < list.length; i++) {
    ctx.lineTo(portX, list[i] * h)
    portX += diff
  }
  ctx.stroke()
}

export default PerformanceChart
