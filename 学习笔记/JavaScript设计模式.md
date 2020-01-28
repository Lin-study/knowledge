# 1.-1 灵活的 JavaScript

> 像个对象使用它

## 1.1. 收编变量

  > 减少全局变量的声明，合并相同类型

  

``` JavaScript
  function checkName() {}

  function checkEmail() {}

  function checkPassword() {}
```

  + 对象

  

``` JS
  let checkoutObj = {
    checkName() {},
    checkEmail() {},
    checkPassword() {}
  }
```

  + 类

  

``` JS
  // 形式一
  let checkoutObj = function() {}
  checkoutObj.checkName = function() {}
  checkoutObj.checkEmail = function() {}
  checkoutObj.checkPassword = function() {}
  // 形式二
  let checkoutObj = function() {
    this.checkName = function() {}
    this.checkEmail = function() {}
    this.checkPassword = function() {}
  }
  // 形式三
  let checkoutObj = function() {}
  checkoutObj.prototype.checkName = function() {}
  checkoutObj.prototype.checkEmail = function() {}
  checkoutObj.prototype.checkPassword = function() {}
```

## 链式调用

  > 通过在每个方法的末尾将 this 返回

# 面向对象

## 封装

  通过函数来实现一个对象的封装

  > 注：**<font color=red>用函数实现封装首字母大写</font>**

  ### this和原型上的区别

  + 原型连上的方法被调用的时候通过prototype查找，当对象被创建的时候不会再次创建
  + 在this中，则会在每次创建对象的时候重新创建（占用内存）

``` JS
  // 直接在函数内部
  let Book = function(id, name) {
    this.id = id
    this.name = name
  }
  // 放置到原型链上
  let Book = function() {}
  Book.prototype.display = function() {}
```

### 私有属性、私有方法、特权方法、共有属性、共有方法、构造器、静态公用属性、静态公用方法

``` JS
let Book = function() {
  // 私有属性
  let num = 1
  // 私有方法
  function checkoutId() {}
  // 特权方法（访问类，可以通过该方法调用到私有属性和私有方法）
  this.getName = function() {}
  // 共有属性
  this.id = id
  // 共有方法
  this.copy = function() {}
  // 构造器（初始化实例对象的一些属性）
  this.setName(name)
}
// 静态共有属性（不可以在函数内部通过this访问到，不过可以通过Book.访问）
Book.isChinese = function() {}
```

### 创建检察长

> 注：**<font color=red>new关键字可以看作是向对象的this中不停的赋值，如果直接执行该函数则this会变成window对象，此时会出现声明的变量全部都在全局上</font>**

``` JS
var Book = function() {
  if (this instanceof Book) {
    this.name = name
  } else {
    return new Book()
  }
}
```

## 继承

### 函数分类

* 构造函数内-供实例化对象使用
* 构造函数外-通过点语法添加，供类使用
* 原型链上-实例化对象可以通过原型链访问到，供所有实例化对象使用

### 实现方法

#### 类式继承

缺点

* 父类属性中有引用类型的时候，当通过子类型修改时，父类型也会被修改
* 子类的继承时通过prototype对父类实例化得到的，所以在创建父类的时候无法向父类传递参数

``` JS
// 声明父类
function SuperClass() {}
// 声明子类
function SubClass() {}
SubClass.prototype = new SuberClass()
```

#### 构造函数继承

通过在子函数中父类点call(this, 参数)实现

缺点：因为该继承没有涉及到原型，所以子类无法获取到父类原型上的方法，如果想使用只能放到父类的构造函数中（违背了代码复用原则）

``` JS
// 声明父类
function SuperClass() {}
// 声明子类
function SubClass() {
  SuberClass.call(this)
}
```

#### 组合继承

> 将类式继承和构造函数继承合并（在子类构造中执行父类的构造，在子类原型上实例化父类）

缺点： 父类的构造被执行了两次

``` JS
// 声明父类
function SuperClass() {}
// 声明子类
function SubClass() {
  // 构造函数继承（继承构造函数中向this添加的变量）
  SuberClass.call(this)
}
// 类式继承（继承原型）
SubClass.prototype = new SuberClass()
```

#### 原型式继承（封装的类式继承）

> 借助原型可以根据已有的对象创建一个新的对象，同时不必创建新的自定义对象类型

优点： 因为F的构造函数无内容，所以开销比较小

缺点： 和类式继承一样，不过可以向父类传递对象

``` JS
function inheritObject(o) {
  // 声明一个过度函数对象
  function F() {}
  // 过度对象的原型继承父对象
  F.prototype = o
  // 返回过度对象的一个实例，该实例的原型继承了父对象
  return new F()
}
```

#### 寄生式继承(对原型继承封装)

``` JS
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
let book = {
  name: 'this is book name'
}

function createBook() {
  var o = new inheritObject(obj)
  o.getName = function() {}
  return o
}
```

#### 寄生组合式继承

> 通过中间函数先继承了父类的原型，在通过将子类的原型指向中间函数

只继承了父类的原型没有实现父类的构造函数

如果需要实现父类的构造函数，需要在子类中调用（父类.call(this, arg)）

``` JS
/**
 * SubClass 子类
 * SuberClass 父类
 */
function inheritPrototype(SubClass, SuberClass) {
  // 复制父类原型副本保存在变量中
  let p = inheritObject(SuperClass.prototype)
  // 修正因为重写子类原型导致子类的constructor属性被修改的问题
  p.constructor = SubClass
  // 设置子类的原型
  SubClass.prototype = p
}
```

## 多态

> 同一个方法多种调用方式

``` JS
function add() {
  let arg = arguments
  switch (arg.length) {
    case 0:
      return 10
      break
    case :1:
      return 10 + arg[0]
      break
    default:
      return arg[0] + arg[1]
      break
  }
}
```

# 设计模式

## 简单工厂模式

> 用来创建同一类对象，使用者不在关注依赖于那个基类

``` JS
// 通过类实例化对象创建
// 需要新建大量的基类
let PopFactory = function(name) {
  switch (name) {
    case 'test1':
      return new test1()
      break
    case 'test2':
      return new test2()
      break
  }
}
// 通过创建一个新对象然后包装增强其属性和功能来实现
function createPop(type, text) {
  let o = {}
  o.content = text
  o.show = function() {}
  if (type === 'alert') {
    // 差异部分
  } else if (type === 'conf') {
    ouh
    // 差异部分
  }
}
```

## 工厂方法模式

> 通过对产品类的抽象使其创建业务，主要负责用于创建多类产品的实例

将实际创建对象工作推迟到子类当中，如下，想添加其他类的时候只需要在Factory的原型上添加相应的内容即可

``` JS
let Factory = function(type, content) {
  if (this instanceof Factory) {
    return new this[type](context)
  } else {
    return new Factory(type, content)
  }
}

Factory.prototype = {
  Java: function(content) {},
  JavaScript: function(content) {}
}
```

## 幽灵工厂--抽象工程模式

> 通过对类的工程抽象使业务用于对产品类簇的创建，而不负责创建某一类产品的实例

一般用它作为父类来创建一些子类

``` JS
let VehicleFactory = function(subType, superType) {
  if (typeof VehicleFactory[superType] === 'function') {
    function F() {}
    // 使用寄生组合式继承
    // 继承父类属性和方法
    F.prototype = new VehicleFactory[superType]()
    // 将子类的构造指向子类
    subType.constructor = subType
    // 子类原型继承父类
    subType.prototype = new F()
  } else {
    throw new Error('未创建该抽象类')
  }
}
VehicleFactory.car = function() {}
VehicleFactory.car.prototype = {
  getName: function() {
    return new Error('抽象方法')
  }
}
let BMW = function() {}
// 抽象工厂实现对Car抽象类的继承
VehicleFactory(BMW, 'car')
BMW.prototype.getName = function() {}
```

## 建造者模式

> 将一个复杂对象的构建层与其表示层相互分离

工厂模式主要为了创建对象实例或者类簇，不关心创建的整个过程，仅仅需要知道创建的最终结果

建造者模式更注重创建的细节

``` JS
let Person = function(name, work) {
  // 创建缓存对象
  let _person = new Human()
  // 创建姓名解析对象
  _person.name = new Named(name)
  // 创建应聘者期望职位
  _person.work = new Work(work)
  return _person
}
```

## 原型模式

> 用原型实例指向创建对象的类，使用创建新的对象的类共享原型对象的属性和方法

原型模式是将可复用的、可共享的、耗时大的从基类中提取出来然后放在原型中，然后子类通过组合继承或者寄生组合继承将方法和属性继承下来，对子类中需要重写的方法进行重写，这样子类创建的对象即具有子类的属性和方法也共享了基类的原型方法

``` JS
let loopImages = function() {}
loopImages.prototype = {
  changeImage: functino() {}
}
let SlideImg = function() {
  loopImages.call(this)
}
SlideImg.prototype = new loopImages()
SlideImg.prototype.changeImage = function() {}
```

## 单例模式

> 只允许实例化一次的对象类

``` JS
var CreateDiv = function(html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
// a === b  true

//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};
```

# 外观模式

# 适配器模式

# 代理模式

# 装饰者模式

# 桥接模式

# 组合模式

# 享元模式

