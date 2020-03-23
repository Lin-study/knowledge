# performance

## 介绍

可以通过调用 performance 接口获取当前页面与性能相关的信息

performance.now() 返回的时间颗粒度为微秒（百万分之一秒）

performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）

performance.now() 输出的是相对于 performance.timing.navigationStart(页面初始化) 的时间。

## API

### window.performance.navigation

对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向

| 属性          | 含义                         |
|---------------|------------------------------|
| type          | 表示如何导航到这个页面          |
| redirectCount | 表示到达这个页面之前重定向了多少次 |

> type 的取值和含义如下表

| type值 | 含义                                                           |
|-------|----------------------------------------------------------------|
| 0     | 当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址 |
| 1     | 点击刷新页面按钮或者通过Location.reload()方法显示的页面              |
| 2     | 页面通过历史记录和前进后退访问时                                    |
| 255   | 任何其他方式                                                     |

### window.performance.timing

记录许多与性能相关的时间戳记录

``` 
DNS查询耗时 = domainLookupEnd - domainLookupStart
TCP链接耗时 = connectEnd - connectStart
request请求耗时 = responseEnd - responseStart
解析dom树耗时 = domComplete - domInteractive
白屏时间 = domloading - fetchStart
domready时间 = domContentLoadedEventEnd - fetchStart
onload时间 = loadEventEnd - fetchStart
```

| 属性              | 含义                                 |
|-------------------|--------------------------------------|
| navigationStart   | 准备加载页面的起始时间                  |
| domainLookupStart | 开始进行dns查询的时间                   |
| domainLookupEnd   | dns查询结束的时间                      |
| connectStart      | TCP连接开始                           |
| connectEnd        | TCP连接完成                           |
| domInteractive    | 解析dom树开始                         |
| domComplete       | 解析dom树结束                         |
| loadEventEnd      | onload事件结束的时间                   |
| fetchStart        | 开始检查缓存或开始获取资源的时间          |
| domLoading        | loading的时间 (这个时候还木有开始解析文档) |

### window.performance.getEntries()

方法调用后可以获取一个包含了页面中所有的 HTTP 请求的时间数据的数组. 这个数组是一个按startTime排序的对象数组，数组成员除了会自动根据所请求资源的变化而改变以外，还可以用mark(), measure()方法自定义添加。

每个对象的属性中除了包含资源加载过程各个阶段的时间外，还有以下五个属性：

* name：资源名称，是资源的绝对路径或调用mark方法自定义的名称
* startTime: 开始时间
* duration：加载时间
* entryType：资源类型，entryType类型不同数组中的对象结构也不同
* initiatorType：发起的请求者

#### entryType值的含义

| 属性       | 含义                                                          |
|------------|---------------------------------------------------------------|
| mark       | 通过performance.mark()方法添加到数组中的对象                      |       
| measure    | 通过performance.measure()方法添加到数组中的对象                   |       
| resource   | 资源类型，其加载时间用处最多                                       |       
| navigation | 现除chrome和Opera外均不支持，导航相关信息                          |       
| paint      | 获取绘制相关的时间，主要是first-paint 和 first-contentful-paint    |       
| longtask   | 任何在浏览器中执行超过 50 ms 的任务，都是 long task (目前处于草案阶段) |       

#### initiatorType值的含义

| 属性                    | 含义                                            |
|-------------------------|-------------------------------------------------|
| link/script/img/iframe等 | 通过标签形式加载的资源，值是该节点名的小写形式          |
| css                     | 通过css样式加载的资源，比如background的url方式加载资源 |
| xmlhttprequest          | 通过xhr加载的资源                                 |
| navigation              | 当对象是PerformanceNavigationTiming时返回         |

