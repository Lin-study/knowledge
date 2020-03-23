# 什么是

> 不再使用的内存，没有及时释放

# 常见原因

1. 意外的全局变量

``` JS
// 变量在 foo 中使用但是没有声明， JS 就会默认为全局变量，在页面关闭之前不会得到释放
function foo() {
  bar = 2
  console.log('bar没有被声明!')
}
```

2. dom清空时，还存在引用

``` JS
var element = {
  shotCat: document.getElementById('shotCat')
};
document.body.removeChild(document.getElementById('shotCat'));
```

3. 定时器中的内存泄漏

如果没有清除定时器, 那么 someResource 就不会被释放. 但是 setTimeout , 它计时结束后它的回调里面引用的对象占用的内存是可以被回收的.

``` JS
var someResource = getData();
setInterval(function() {
  var node = document.getElementById('Node');
  if (node) {
    node.innerHTML = JSON.stringify(someResource);
  };
}, 1000);
```

4. 不规范地使用闭包

bar作为一个闭包, 即使它内部什么都没有, foo中的所有变量都还是隐式地被 bar 所引用。 即使bar内什么都没有还是造成了循环引用.

``` JS
function foo() {
  var a = {};

  function bar() {
    console.log(a);
  };
  a.fn = bar;
  return bar;
};
```

# 避免策略

1. 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收(即赋值为null)。
2. 注意程序逻辑，避免“死循环”之类的。
3. 避免创建过多的对象 原则：不用了的东西要记得及时归还。
4. 减少层级过多的引用。

