/**@description 改变渐变色的旋转角度 */
function colorRotate() {
  //鼠标落下时到圆心的距离
  let mouseDownToCenter = 20
  let rotateLeft
  let rotateTop
  if(this.LgColorRotate === 0) {
    rotateLeft = event.pageX
    rotateTop = event.pageY
  }
  //0到90度
  if(this.LgColorRotate !== 0) {
    let rotate = this.LgColorRotate
    if(this.LgColorRotate > 90&&this.LgColorRotate < -90) {
      rotate = 180-this.LgColorRotate
    }
    let remRotate = 90-rotate
    let diffPageX = Math.sqrt(400*Math.pow(rotate,2)/(Math.pow(rotate,2)+Math.pow(remRotate,2)))
    let diffPageY = diffPageX*remRotate/rotate
    if(this.LgColorRotate < 90&&this.LgColorRotate>0) {
      rotateLeft = event.pageX - diffPageX
      rotateTop = event.pageY - diffPageY
    }
    if(this.LgColorRotate > -90&&this.LgColorRotate<0) {
      rotateLeft = event.pageX + diffPageX
      rotateTop = event.pageY - diffPageY
    }
    if(this.LgColorRotate ===90) {
      rotateLeft = event.pageX - 20
      rotateTop = event.pageY - 20
    }
    if(this.LgColorRotate ===-90) {
      rotateLeft = event.pageX + 20
      rotateTop = event.pageY - 20
    }
    if(this.LgColorRotate > 90) {
      rotateLeft = event.pageX - diffPageX
      rotateTop = event.pageY - diffPageY-40
    }
    if(this.LgColorRotate < -90) {
      rotateLeft = event.pageX + diffPageX
      rotateTop = event.pageY - diffPageY -40
    }
    if(this.LgColorRotate === 180) {
      rotateLeft = event.pageX
      rotateTop = event.pageY - 40
    }
  }
  document.onmousemove = event => {
    let movePageX = event.pageX
    let movePageY = event.pageY
    let diffX = movePageX - rotateLeft
    let diffY = movePageY - rotateTop
    if(diffX < 0) {
      diffX = Math.abs(diffX)
      this.LgColorRotate = - this.getShapeRotate(diffX,diffY,mouseDownToCenter,this.LgColorRotate)
    }else {
      this.LgColorRotate = this.getShapeRotate(diffX,diffY,mouseDownToCenter,this.LgColorRotate)
    }
    this.initColorViewer()
  }
  //当鼠标抬起
  document.onmouseup = event => {
    //清空mouse事件
    document.onmousemove = null
    document.onmouseup = null
  }
}
/**
 * @description 获取渐变色的旋转角度 
 * @param {number} diffX X轴上的差值
 * @param {number} diffY Y轴上的差值
 * @param {number} mouseDownToCenter 鼠标到旋转圆心的距离
 * @param {number} newRotate 当前的旋转角度
 * */
function getShapeRotate(diffX,diffY,mouseDownToCenter,newRotate) {
  let moveY = mouseDownToCenter - diffY
  let rotate = null
  if(newRotate > 90 || newRotate < -90) {
    rotate = 180 - parseInt(90*diffX/(diffX-moveY))
  }else {
    rotate = parseInt(90*diffX/(moveY+diffX))
  }
  return rotate
}