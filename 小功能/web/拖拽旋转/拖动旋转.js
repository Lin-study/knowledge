function shapeRotate(that, isBigBoard, containerX, containerY, compX, compY) {
  let transform = that.RotateRectTransform.split(' ')
  //获取当前被选中的形状
  let selectedShapeObj = this.getSelectedShapeObj(that)
  let type = selectedShapeObj.type
  let rotateShapeLeft = parseInt(transform[0].substring(10))
  let rotateShapeTop = parseInt(transform[1])
  //鼠标落下时到圆心的距离
  let mouseDownToCenter = null
  if (type === 'line') {
    mouseDownToCenter = parseInt(selectedShapeObj.startY) + (parseInt(selectedShapeObj.endY) - parseInt(selectedShapeObj.startY)) / 2 - rotateShapeTop
  }
  if (type === 'rect' || type === 'image' || type === 'arrow' || type === 'polygon') {
    mouseDownToCenter = parseInt(selectedShapeObj.startY) + parseInt(selectedShapeObj.height) / 2 - rotateShapeTop
  }
  if (type === 'ellipse') {
    mouseDownToCenter = parseInt(selectedShapeObj.cy) - rotateShapeTop
  }
  document.onmousemove = event => {
    let movePageX = null
    let movePageY = null
    if (isBigBoard) {
      movePageX = (event.pageX - 90) / that.value
      movePageY = (event.pageY - 30) / that.value
    } else {
      movePageX = parseInt((event.pageX - containerX) / that.value - compX)
      movePageY = parseInt((event.pageY - containerY) / that.value - compY)
    }
    let diffX = movePageX - rotateShapeLeft
    let diffY = movePageY - rotateShapeTop
    if (diffX < 0) {
      diffX = Math.abs(diffX)
      let rotate = this.getShapeRotate(diffX, diffY, mouseDownToCenter, selectedShapeObj.style.rotate)
      if (rotate) {
        selectedShapeObj.style.rotate = -rotate
      }
    } else {
      let rotate = this.getShapeRotate(diffX, diffY, mouseDownToCenter, selectedShapeObj.style.rotate)
      if (rotate) {
        selectedShapeObj.style.rotate = rotate
      }
    }
  }
}
function getShapeRotate(diffX, diffY, mouseDownToCenter, newRotate) {
  let moveY = mouseDownToCenter - diffY
  let rotate = null
  if (newRotate > 90 || newRotate < -90) {
    rotate = 180 - parseInt(90 * diffX / (diffX - moveY))
  } else {
    rotate = parseInt(90 * diffX / (moveY + diffX))
  }
  return rotate
}