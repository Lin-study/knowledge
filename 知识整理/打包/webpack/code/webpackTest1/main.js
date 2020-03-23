// import 'babel-polyfill'
import './left'
import './right.ts'
import './css/main.css'
import './css/lassTest.less'
import './css/sassTest.sass'
import img2 from './img/img2.jpg'
import './font/iconfont.css'

let img = new Image()
img.src = img2
document.getElementById('div1').appendChild(img)
let i = document.createElement('i')
i.setAttribute('class', 'iconfont icon-zujian')
document.getElementById('div1').appendChild(i)

// document.getElementById('div1').setAttribute('class', mainCss.div1)

let main = 'main'

async function a() {

}
