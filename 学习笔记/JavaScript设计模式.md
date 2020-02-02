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
  changeImage: function() {}
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

## 外观模式

> 为一组复杂的子系统接口提供一个更高级的同一接口，通过这个接口使得对子系统接口的访问更容易

用于统一功能接口方法不统一

``` JS
// 封装针对dom事件在不同浏览器中的表现
function addEvent(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}
```

很多代码库也会通过外观模式来封装功能，通过对接口方法的外层包装，以供上层代码调用

``` JS
let dom = {
  g: function() {},
  css: function() {},
  attr: function() {}
}
```

## 适配器模式

> 将一个接口转换成留一个接口以满足用户的使用

### 框架适配器

``` JS
// 两个除了命名空间不一致时
window.A = A = jquery
// 仅为相似时
A.g = function(id) {
  return $(id).get(0)
}
```

### 参数适配器

因为参数有一些必须传入，或者说有默认值，常用此方法实现，但是ES6中可以直接对参数设置默认值

``` JS
function doSomeThing(obj) {
  let _adapter = {
    name: 233
  }
  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i]
  }
}
```

## 代理模式

> 由于一个对象不能直接引用另一个对象，需要通过代理对象在两个对象中起到中介作用

``` JS
// 代理统计--站长统计
// 通过img标签的src属性发送的get请求是一个代理对象
let Count = (function() {
  let img = new Image()
  return function(param) {
    let str = 'http://122d'
    for (let i in param) {
      str += i + '='
      param[i]
    }
    img.src = str
  }
})()
Count({
  num: 10
})
// JSONP
// 通过script标签作为代理对象
```

## 装饰者模式

> 在不改变源对象的基础上，通过对其进行包装使源对象可以满足用户的更复杂需求

### 实现方式

1. 获取事件源
2. 获取事件源方法并另行存储
3. 将事件源的方法更新为先执行旧事件再执行新事件

``` JS
let decorator = function(input, fn) {
  let input = document.getElementById(input)
  if (typeof input.onclick === 'function') {
    let oldClickFn = input.onclick
    input.onclick = function() {
      oldClickFn()
      fn()
    }
  } else {
    input.onclick = fn
  }
}
```

### 和适配器模式区别

相同点

* 都是针对一个对象的装饰来适配其他对象

不同点

* 适配器模式：是对原有的对象进行适配，添加的方法和原有对象功能大致相似
* 装饰者模式：提供的方法和原方法有一定的区别（不需要了解对象的原有功能）

## 桥接模式

> 在系统延展多个维度变化的同时，又不增加其复杂度并已到达解耦

``` JS
// 匿名函数--桥接方法
span[0].onmouseover = function() {
  changeColor(this, 'red', '#fff')
}
```

## 组合模式

> 将对象组合成树形结构以表示“部分整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性

将面板中的数据拆成树状结构

例如构建一个新闻模块

``` JS
// 先创建基类（供所有对象继承）
let News = function() {}
// 创建容器函数（供新闻类对象的存放）
let Container = function() {}
// 创建每条新闻的容器类
let Item = function() {}
// 创建每条新闻的组合类
let NewsGroup = function() {}

/***********************单条新闻的实现******************************/
// 图片类新闻
let ImageNews = function() {}
// 携带icon的新闻
let IconNews = function() {}
// 文字新闻
let EasyNews = function() {}

/***********************创建新闻***********************************/
let news1 = new Countatiner('news', document.body)
news1.add(
  new Item('normal').add(
    new IconNews('新闻1', '#', 'videw')
  )
).add(
  new Item('normal').add(
    new IconNews('新闻2', '#', 'live')
  )
).add(
  new Item('normal').add(
    new NewsGroup('img1').add(
      new ImageNews('1.png', '#', 'small')
    ).add(
      new EasyNews('新闻3')
    )
  )
)
```

## 享元模式

> 运用共享技术有效的支持大量的细粒度的对象，避免对象间用于相同内容造成多余的开销

主要是对数据、方法的共享分离，将数据和对象分为内部数据、内部方法和外部数据、外部方法。

内部数据和方法是相似或者共有的数据和方法

``` JS
/***************事件的享元--将获取和创建dom的方法提取******************/
let FlyWeight = function() {
  let created = []

  function create() {
    let dom = document.createElement('div')
    document.getElementById('container').appendChild(dom)
    created.push(dom)
    return dom
  }
  return {
    getDiv: function() {
      if (created.length < 5) {
        return create()
      } else {
        let div = created.shift()
        created.push(div)
        return div
      }
    }
  }
}

/***********************享元动作*****************************************/
// 创建共有的移动方法
let flyWeight = {
  moveX: function(x) {
    this.x = x
  },
  moveY: function(y) {
    this.y = y
  }
}
// 移动继承
let Player = function() {}
Player.prototype = flyWeight
```

## 模板方法模式

> 父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类，使子类可以不改变父类的算法的同时可以重新定义算法中某些实现步骤

将多个模型抽象归一化，从中抽取出来一个最基本的模板，其他模板只需要继续继承这个模板方法

``` JS
/****************************创建提示框*******************************************/
// 创建模板基类
let AlertPanel = function() {}
AlertPanel.prototype = {}
// 根据抽象的模板基类通过继承方式实现功能
// 右侧提示按钮
let RightAlert = function(data) {
  AlertPanel.call(this, data)
}
RightAlert.prototype = new AlertPanel()
// 同时继承的类也可以再次作为基类
let cancelAlert = function(data) {
  RightAlert.call(this, data)
}
cancelAlert.prototype = new RightAlert()
/****************************创建多类导航*******************************************/
// 设置导航基类
let Nav = function(data) {
  return html
}
// 实现类
let NumNav = function(data) {
  return Nav.call(this, data)
}
```

## 观察者模式（发布-订阅者模式）

> 定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合

通常负责模块之间的通信

1. 接受发来的消息
2. 向订阅的中转站发送相应的消息

``` JS
// 创建观察者（使用闭包在页面加载的时候被直接执行）
let Observer = (function() {
  let _message = {}
  return {
    // 注册
    regist: function(type, fn) {
      if (typeof fn !== 'function') return
      if (_message[type]) {
        _message[type].push(action)
      } else {
        _message[type] = [action]
      }
    },
    // 发布
    fire: function(type, args) {
      if (!_message[type]) return
      let events = {
        type,
        args: args || {}
      }
      _message[type].forEach(fn => {
        fn.call(this, events)
      })
    },
    // 移除
    remove: function(type, fn) {
      if (_message[type] instanceof Array) {
        _message[type].splice(_message[type].indexof(fn), 1)
      }
    }
  }
})()
```

## 状态模式

> 当一个对象内部状态发生改变时，会导致其行文的改变，这看起来像是改变了状态。

和策略模式很像，都是在内部封装一个对象，通过返回的接口对象实现对内部对象的调用

``` JS
function ResultState() {
  // 状态对象
  let states = {
    state0: function() {},
    state1: function() {}
  }
  // 当前状态
  let myState = 0
  // 更新状态
  const changeState = (state) => {
    myState = state
    return this
  }
  // 执行状态方法
  const show = (result) => {
    states['state' + myState] && states['state' + myState]()
    return this
  }
  return {
    show,
    chageState
  }
}
ResultState().changeState(0).show().show().chageState(1).show()
```

## 策略模式（jquery的动画缓冲函数）

> 将定义的一组算法封装起来，使其互相之间可以替换。封装的算法具有一定独立性，不会随客户端的变化而变化

``` JavaScript
function Person(age, name) {
  this.age = age
  this.name = name
  // 定义算法对象
  let valiob = {
    name: function(value) {
      if (typeof value === 'string') return true
    },
    age: function(value) {
      if (typeof value === 'number' && value >= 18) return true
    }
  }
  return new Proxy(this, {
    get: function(target, key) {
      return Reflect.get(target, key)
    },
    set: function(target, key, value) {
      if (valiob[key] && valiob[key](value)) {
        return Reflect.set(target, key, value)
      } else {
        return new Error(key + 'type Error')
      }
    }
  })
}
```

## 职责链模式

> 解决请求发送者和接受者之间的耦合，通过多个对象分解请求流程，实现请求多个对象之间的传递，知道最后一个对象完成请求

如果一个需求要做很多事，那就将每件事情独立出去一个模块对象去处理

## 命令模式

> 将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端实现参数化

是将创建模块的逻辑封装在一个对象里，这个对象提供一个参数化的请求接口，通过这个接口并传递一些参数实现调用命令对象内部中的一些方法

``` JS
// 模块实现
function viewCommand = (function() {
  // 方法集合
  let action = {
    // 创建方法
    create: function() {},
    // 展示方法
    display: function() {}
  }
  // 命令接口
  return function excute(msg) {
    msg.param = Array.isArray(msg.param) ? msg.param : [msg.param]
    action[msg.command].apply(action, msg.param)
  }
})()
// 调用
viewCommand({
  // 执行的方法
  command: 'create',
  // 参数
  param: [{}]
})
```

## 访问者模式

> 针对对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法

通过call或apply的作用更改函数执行的作用域

``` JS
function bindIEEvent(dom, type, fn, data) {
  dom.attachEvent('on' + type, function(e) {
    fn.call(dom, e, data)
  })
}
```

## 中介者模式

> 通过中介者对象封装一系列对象之间的交互，使对象之间不再相互引用，降低耦合

相比于观察者模式（发布订阅）是单向通信的，中介者模式中消息发送方只有一个，中介对象不能订阅消息，只有活跃对象（订阅者）才可以订阅中介者的消息

``` JS
function mediator() {
  let _msg = {}
  return {
    register: function(type, action) {
      if (_msg[type]) {
        _msg[type].push(action)
      } else {
        _msg[type] = [action]
      }
    },
    send: function(type) {
      if (_msg[type]) {
        _msg[type].forEach(fn => {
          if (typeof fn === 'function') fn()
        })
      }
    }
  }
}
```

## 备忘录模式

> 在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象回复到以前的某个状态

## 迭代器模式

## 解释器模式

## 链模式

## 委托模式

## 数据访问对象模式

## 节流模式

## 简单模板模式

## 惰性模式

## 参与者模式

## 等待者模式

## 同步模块模式

## 异步模块模式

## widget模式

## MVC模式

## MVP模式

## MVVM模式

