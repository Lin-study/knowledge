Vue部分
	1.vue的生命周期
		1、new Vue()   创建vue实例
		2、beforeCreate  执行钩子函数
		3、create
		4、初始化vue实例是如果没有传入el，则需要通过$mount挂在相关dom节点
		5、模板，将编译后的html挂载到对应的虚拟dom节点上
		6、beforeMounted   执行钩子函数
		7、mounted
		8、beforeUpdate   数据发生变化执行钩子函数
		9、update
		10、beforeDestroy   组件被销毁执行钩子函数
		11、destroy

	2.Vue的diff算法
		简单说就是将之前的dom树拷贝一份，当dom树中的某个节点发生变化的时候通过头层级进行新旧节点的对比，将变化的新节点更新到真实的dom树上并且更新拷贝的dom树

	3.虚拟dom原理
		将操作压缩，当出现多次更新dom的情况时，会先将更新保存到内存中的一个对象上最终一次更新，减少了浏览器的重绘操作减少性能消耗。

	4.Key的作用
		相当于添加了一个索引，可以准确的追踪和定位到每一个元素，更高效的更新虚拟DOM节点

	5.Vuex是什么，简述一下
		Vuex是专为vue开发的状态管理的插件，常用于多组件或跨层组件之间的通讯使用。
	6.Vue的双向绑定原理，手写一个简单的双向绑定（proxy）
		vue2.0是通过object.defineProperty()方法来劫持数据的getter和setter属性，当触发setter属性时，通知订阅者触发更新回调函数，重新渲染视图。
		vue3.0则是通过ES6的新特性proxy来代理数据的getter和setter属性
		let proxy = new Proxy(Obj, {
			get(target, key) {
				return Reflect.get(target, key)
			}
			set(target, key, value) {
				return Reflect.set(target, key, value)
			}
		})
	7.用vue写一个组件，功能是反馈鼠标在整个页面的位置
		<template>
			<span>鼠标X位置:{{spot.x}}</span>
			<span>鼠标Y位置:{{spot.y}}</span>
		</template>
		<script>
			export default {
				data() {
					return {
						spot: {
							x:0,
							y:0
						}
					}
				}
				mounted() {
					const vm = this
					window.addEventListener('onmousemove', (e) => {
						Object.assign(vm.spot, {
							x: e.screenX,
							y: e.screenY
						})
					})
				}
			}
		</script>
	8.vue组件之间传值有哪些方法，解释下eventbus
		1、通过prop
		2、通过this.$parent, $refs, $children
		3、通过this.$emit
		4、通过vuex
		5、通过eventbus

		eventbus是在内存中开辟了一个方法池，当调用$on，存入相应的执行方法$emit（根据key值去执行相应的方法）$off（根据key值去释放对应的内存）
	9.Vue-router有哪些钩子函数
		1、全局
			beforeEach
			afterEach
		2、单个路由的
			beforeEnter
			beforeLeave
		3、组件路由
			beforeRouteEnter
			beforeRouteUpdate
			beforeRouteLeave
	10.Vue中怎么自定义指令
		1、全局
			Vue.directive('color', {
				bind: () => {}, // 绑定的时候触发
				inserted: () => {}, // 插入元素的时候触发
				updated: () => {} // 更新的时候触发
			})
		2、组件内
			directives: {
				color: {
					bind: () => {}, // 绑定的时候触发
					inserted: () => {}, // 插入元素的时候触发
					updated: () => {} // 更新的时候触发
				}
			}
	11.v-if和v-show的区别
		1、v-if
			动态的添加和删除dom节点，当初始化为false时不会参与编译，切换时会重建和销毁相关数据
		2、v-show
			通过控制css的display来显示和隐藏相关dom节点，即使初始化为false也会参与编译
	12.Vue和jquery的区别
		1、jquery
			基于原生js封装可以更加快速的操作dom节点，常用于需要js来操作的页面
		2、vue
			将数据和视图分割，通过双向绑定快速修改虚拟dom节点
	13.Vue的路由模式
		vue路由分为两种模式
			1、hash路由
			2、history路由
	14.MVVM模式的理解
	15.Keep-alive
		keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在v页面渲染完毕后不会被渲染成一个DOM元素
		当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行
		被包裹在keep-alive中的组件的状态将会被保留
	16.vue常用的指令/修饰符
		指令
			1、v-on
			2、v-for
			3、v-if
			4、v-show
		修饰符
			.stop阻止事件冒泡
	　　.prevent阻止自身事件
	　　.self只有自身事件才会触发
	　　.capture:捕获事件
			.once只执行一次
	17.Watch和computed的区别
		watch和computed都是以Vue的依赖追踪机制为基础
		1.watch擅长处理的场景：一个数据影响多个数据
		2.computed擅长处理的场景：一个数据受多个数据影响
	18.Vue-loader是什么
		1.vue-loader是webpack的加载器，允许以单文件组件（SFC）的格式创作Vue组件
		2.允许对Vue组件的每个部分使用其他webpack加载器
		3.允许.vue文件中的自定义块可以应用自定义加载程序链，简单来说就是可以解析.vue文件
		4.处理在模块依赖项中引用的静态资源
		5.模拟每个组件的范围CSS
		6.在开发过程中保持热加载
	19.Webpack打包原理，loader和plugin是干什么的
		对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程；
		对于plugin，它就是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，通过对节点的监听，从而找到合适的节点对文件做适当的处理。
	20.This.a与this.data.a一样嘛，怎么实现的
		在data函数执行的时候执行了data.call(this)让vue继承了data的属性和方法