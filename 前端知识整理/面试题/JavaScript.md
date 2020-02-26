# 面试题

* 1、undefined 和 null 有什么区别----undefined是未指定特定值的变量的默认值， null是“不代表任何值的值”。null是已明确定义给变量的值。
* 2、&& 运算符 和 || 运算符---均可实现短路，&& 在判断为 false 时 不会执行后续操作，|| 在判断为 true 时不会执行后续操作
* 3、DOM 是什么---文档对象模型，用来表示 HTML 中的节点构成
* 4、什么是事件传播?
  + 事件传播有三个阶段：
    - 捕获阶段–事件从 window 开始，然后向下到每个元素，直到到达目标元素。
    - 目标阶段–事件已达到目标元素。
    - 冒泡阶段–事件从目标元素冒泡，然后上升到每个元素，直到到达 window。
* 5、event.preventDefault() 和 event.stopPropagation()方法之间有什么区别？
  + event.preventDefault() 方法可防止元素的默认行为。如果在表单元素中使用，它将阻止其提交。如果在锚元素中使用，它将阻止其导航。如果在上下文菜单中使用，它将阻止其显示或显示。
  + event.stopPropagation()方法用于阻止捕获和冒泡阶段中当前事件的进一步传播。
* 6、event.target 和 event.currentTarget
  + event.target是触发事件的元素
  + event.currentTarget是附加事件处理程序的元素。
* 7、== 和 === 有什么区别---  ==在比较的时候可以转换数据类型，===严格比较，只要类型不匹配就返回flase
* 8、如何在一行中计算多个表达式的值？
  + 可以使用逗号运算符在一行中计算多个表达式。它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。（x = (x++, x *= 2, x -= 5, x += 10); ）
* 9、什么是闭包？
  + 闭包就是一个函数在声明时能够记住当前作用域、父函数作用域、及父函数作用域上的变量和参数的引用，直至通过作用域链上全局作用域，基本上闭包是在声明函数时创建的作用域。
* 10、JavaScript中 this 值是什么 --- this指的是当前正在执行或调用该函数的对象的值。this值的变化取决于我们使用它的上下文和我们在哪里使用它。
* 11、apply、call、bind区别
  + apply---执行并更改方法的作用域，（参数通过数组方式进行传递）
  + call---执行并更改方法的作用域，（参数通过参数列表方式进行传递）
  + bind---固定一个函数的this为参数的第一个
* 12、什么是函数式编程? JavaScript的哪些特性使其成为函数式语言的候选语言？
  + 是通过编写纯函数，避免共享状态、可变数据、副作用 来构建软件的过程
* 13、什么是高阶函数？
  + 高阶函数只是将函数作为参数或返回值的函数。
* 14、手动实现 `Array.prototype.map` 方法

``` JS
function map(arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}
```

* 15、手动实现 `Array.prototype.filter` 方法

``` JS
function filter(arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback(arr[i], i, arr)) {
        // 如果条件为真，则将数组元素 push 到 result 中
        result.push(arr[i]);
      }
    }
    return result; // return the result array
  }
}
```

* 16、手动实现 `Array.prototype.reduce` 方法

``` JS
function reduce(arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];、
    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}
```

