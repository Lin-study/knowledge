# 基础知识

* 程序入口
* 控制台输入
* 变量
* 检查null或零
* Functions
* 异步编程
  + futures
  + async和await

## 程序入口

JavaScript 没有预定义的入口函数，但是在Dart中每个app都必须有一个顶级的 main 函数作为应用程序的入口

``` 
main() {
  
}
```

## 控制台输出

``` 
// js
console.log('hello world')
// Dart
print('hello world')
```

## 变量

Dart 是类型安全的 - 它使用静态类型检测和运行时的组合，检查以确保变量的值始终与变量的静态值匹配。尽管类型是必须的，但某些类型注释是可选的，因为Dart会执行类型推断

``` 
// js
var name = "javascript"
// Dart
String name = 'dart'
```

## 默认值

* js中未初始化的变量为undefined
* Dart中未初始化的变量未null

## 判断

* js中，除了null、undefined、false、0其他的判断都为 true
* Dart中，只有 true（布尔）被视为 true

``` 
// ?.运算发在左边为努力了的情况下会阻断右边的调用
// ??运算符主要作用是在左侧表达式为null时为其设置默认值
bool isConnected(a, b) {
  bool outConn = outgoing[a]?.contains(b)??false
  bool inConn = incoming[a]?.contains(b)??false
  return outConn || inConn
}
```

## Function

``` 
// js
function fn() {
  return true
}
// Dart
fn() {
  return true
}
// 也可以这样写
bool fn() {
  return true
}
```

## 异步编程

与js一样，Dart支持单线程执行，在js中 promise表示异步操作，Dart使用Future来表示

``` 
getIpAddress() {
  final url = ''
  HttpRequest.request(url).then((value) {
  }).catchError((error) => print(error))
}
```

