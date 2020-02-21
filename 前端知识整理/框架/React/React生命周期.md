# React的生命周期

> 生命周期函数是指某一个时刻组件会自动调用执行的函数

* constructor： 组件被创建的时候被调用
* render函数：组件初始化或者数据更新时被调用

1. Initialization（初始化）

   1. 数据初始化（初始化state和props）

2. Mounting（组件挂载）

   1.componentWillMount（在组件即将被挂载到页面上执行）
   2.render函数
   3.componentDidMount（组件被挂载到页面上后被执行）

3. Updation（组件更新）

   1. Props

      1. ComponentWillReceiveProps

         1. 子组件从父组件接受函数
         2. 父组件的render函数被执行，子组件的该函数被执行
         3. 组件第一次放入父组件时不会执行
         4. 如果组件之前已经存在于父组件中，才会执行

      2. 执行states的变化

   2.states

      1. shouldComponentUpdate（组件被更新之前执行, 判断是否需要更新，默认返回true）
      2. componentWillUpdate（组件确认被更新后，组件更新执行）
      3. 执行render函数
      4. componentDidUpdate（组件更新后被执行）
4. Unmounting（卸载）

   1. ComponentWillUnmount（在卸载之前被执行）