let oInput = document.createElement('input')
oInput.style.display = 'none';
oInput.className = 'oInput'
document.body.appendChild(oInput)
/**@description 复制图形的id*/
function copyitemID(id) {
  oInput.value = id
  oInput.select() // 选中要复制的内容
  document.execCommand("Copy") // 执行浏览器复制命令
}

// 对粘贴事件的监听
document.body.addEventListener('paste', () => {
  //paste事件
  let item = event.clipboardData.getData('Text')
  if (typeof item == 'string') {
    try {
      let obj = JSON.parse(item);
    } catch (e) { }
  }
}, false)

