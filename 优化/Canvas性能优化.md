# 优化方案

* 减少 API 的使用
* 使用缓存（重点）
* 合并频繁使用的 API
* 避免使用高耗能的 API
* 用 webWorker 来处理一些比较耗时的计算

# 使用多层画布绘制复杂场景

即：将变化频率高、幅度大的部分和变化频率小、幅度小的部分分成两个或两个以上的 canvas 对象。也就是说生成多个 canvas 实例，把它们重叠放置，每个 Canvas 使用不同的 z-index 来定义堆叠的次序。

# 使用 requestAnimationFrame 制作动画

* 经过浏览器优化，动画更流畅
* 窗口没激活时，动画将停止，节省计算资源
* 更省电，尤其是对移动终端

# 清除画布尽量使用 clearRect

一般情况下的性能：clearRect > fillRect > canvas.width=canvas.width; 

# 使用离屏绘制进行预渲染

当使用 drawImage 绘制同样的一块区域：

若数据源（图片、canvas）和 canvas 画板的尺寸相仿，那么性能会比较好；

若数据源只是大图上的一部分，那么性能就会比较差；因为每一次绘制还包含了裁剪工作。

第二种情况我们就可以先把待绘制的区域裁剪好，保存在一个离屏的 canvas 对象中。在绘制每一帧的时候，在将这个对象绘制到 canvas 画板中。

drawImage 方法的第一个参数不仅可以接收 Image 对象，也可以接收另一个 Canvas 对象。而且，使用 Canvas 对象绘制的开销与使用 Image 对象的开销几乎完全一致。

当每一帧需要调用的对象需要多次调用 canvasAPI 时，我们也可以使用离屏绘制进行预渲染的方式来提高性能。

``` JS
let cacheCanvas = document.createElement("canvas");
let cacheCtx = cacheCanvas.getContext("2d");
cacheCtx.save();
cacheCtx.lineWidth = 1;
for (let i = 1; i < 40; i++) {
  cacheCtx.beginPath();
  cacheCtx.strokeStyle = this.color[i];
  cacheCtx.arc(this.r, this.r, i, 0, 2 * Math.PI);
  cacheCtx.stroke();
}
cacheCtx.restore();
// 在绘制每一帧的时候，绘制这个图形
context.drawImage(cacheCtx, x, y);
```

# 尽量少调用 canvasAPI ，尽可能集中绘制

> 写粒子效果时，可以使用方形替代圆形，因为粒子小，所以方和圆看上去差不多。画一个圆需要三个步骤：先 beginPath，然后用 arc 画弧，再用 fill。而画方只需要一个 fillRect。当粒子对象达一定数量时性能差距就会显示出来了。

``` JS
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i + 1];
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}
/***************** 将上述代码改成如下 *************************/
context.beginPath();
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i + 1];
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
}
context.stroke();
```

# 像素级别操作尽量避免浮点运算

进行 canvas 动画绘制时，若坐标是浮点数，可能会出现 CSSSub-pixel 的问题. 也就是会自动将浮点数值四舍五入转为整数，在动画的过程中就可能出现抖动的情况，同时也可能让元素的边缘出现抗锯齿失真情况。

虽然 javascript 提供了一些取整方法，像 Math.floor， Math.ceil， parseInt，但 parseInt这个方法做了一些额外的工作（比如检测数据是不是有效的数值、先将参数转换成了字符串等），所以，直接用 parseInt 的话相对来说比较消耗性能。
可以直接用以下巧妙的方法进行取整：

``` JS
functiongetInt(num) {
  var rounded;
  rounded = (0.5 + num) | 0;
  return rounded;
}
```

