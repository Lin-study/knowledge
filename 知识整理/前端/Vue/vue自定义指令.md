# 指令

## V-Hotkey（添加一个或多个快捷键）

* 仓库地址: https://github.com/Dafrok/v-hotkey
* Demo: 戳这里 https://dafrok.github.io/v-hotkey
* 安装: npm install --save v-hotkey
* 这个指令可以给组件绑定一个或多个快捷键。你想要通过按下 Escape 键后隐藏某个组件，按住 Control 和回车键再显示它吗？小菜一碟：

``` 
<template>
  <div
    v-show="show"
    v-hotkey="{
      'esc': onClose,
      'ctrl+enter': onShow
    }"
  >
      Press `esc` to close me!
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    onClose() {
      this.show = false
    },
    onShow() {
      this.show = true
    },
  }
}
</script>
```

## V-Click-Outside（点击外部区域关闭组件）

* 仓库地址: https://github.com/ndelvalle/v-click-outside
* Demo: https://codesandbox.io/s/zx7mx8y1ol?module=%2Fsrc%2Fcomponents%2FHelloWorld.vue
* 安装: npm install --save v-click-outside
* 你想要点击外部区域关掉某个组件吗？用这个指令可以轻松实现。这是我每个项目必用的指令之一，尤其在弹框和下拉菜单组件里非常好用。

``` 
<template>
  <div
    v-show="show"
    v-click-outside="onClickOutside"
  >
    Hide me when a click outside this element happens
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    onClickOutside() {
      this.show = false;
    }
  }
};
</script>
```

> 说明： 你也可以通过双击外部区域来触发，具体用法请参考文档。

## V-Clipboard（复制到剪贴板）

* 仓库地址: https://github.com/euvl/v-clipboard
* 安装: npm install --save v-clipboard
* 这个简单指令的作者是Yev Vlasenko ，可以用在任何静态或动态元素上。当元素被点击时，指令的值会被复制到剪贴板上。用户需要复制代码片段的时候，这个非常有用。

``` 
<button v-clipboard="value">
  Copy to clipboard
</button>
```

## Vue-ScrollTo（滚动在指定位置）

* 仓库地址: https://github.com/rigor789/vue-scrollTo
* Demo: https://vue-scrollto.netlify.com/
* 安装: npm install --save vue-scrollto
* 这个指令监听元素的点击事件，然后滚动到指定位置。我通常用来处理文章目录跳转和导航跳转。

``` 
<span v-scroll-to="{
  el: '#element',          // 滚动的目标位置元素
  container: '#container', // 可滚动的容器元素
  duration: 500,           // 滚动动效持续时长（毫秒）
  easing: 'linear'         // 动画曲线
  }"
>
  Scroll to #element by clicking here
</span>
```

> 说明： 也可以通过代码动态设置，具体看文档。

## Vue-Lazyload（图片懒加载）

* 仓库地址: https://github.com/hilongjw/vue-lazyload
* Demo: http://hilongjw.github.io/vue-lazyload/
* 安装: npm install --save vue-lazyload
* 图片懒加载，非常方便。

``` 
<img v-lazy="https://www.domain.com/image.jpg">
```

## V-Tooltip（添加tooltip）

* 仓库地址: v-tooltip
* Demo: available here
* 安装: npm install --save v-tooltip
* 几乎每个项目都会用到 tooltip。这个指令可以给元素添加响应式的tooltip，并可控制显示位置、触发方式和监听事件。

``` 
<button v-tooltip="'You have ' + count + ' new messages.'">
```

> 说明： 还有一个比较流行的tooltip插件vue-directive-tooltip.

## V-Scroll-Lock（打开模态浮层防止下层滚动）

* 仓库地址: https://github.com/phegman/v-scroll-lock
* Demo: https://v-scroll-lock.peterhegman.com/
* 安装: npm install --save v-scroll-lock
* 基于 body-scroll-lock 开发，这个指令的作用是在打开模态浮层的时候防止下层的元素滚动。

``` 
<template>
  <div class="modal" v-if="opened">
    <button @click="onCloseModal">X</button>
    <div class="modal-content" v-scroll-lock="opened">
      <p>A bunch of scrollable modal content</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      opened: false
    }
  },
  methods: {
    onOpenModal () {
      this.opened = true
    },

    onCloseModal () {
      this.opened = false
    }
  }
}
</script>
```

## V-Money（添加获取的前后缀）

* 仓库地址: https://github.com/vuejs-tips/v-money
* Demo: https://vuejs-tips.github.io/v-money/
* 安装: npm install --save v-money
* 如果你需要在输入框里加上货币前缀或后缀、保留小数点位数或者设置小数点符号——不用找了，就是它！一行代码搞定这些需求：

``` 
<template>
  <div>
    <input v-model.lazy="price" v-money="money" /> {{price}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      price: 123.45,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        precision: 2,
      }
    }
  }
}
</script>
```

## Vue-Infinite-Scroll（无限滚动）

* 仓库地址: https://github.com/ElemeFE/vue-infinite-scroll
* 安装: npm install --save vue-infinite-scroll
* 无限滚动指令，当滚动到页面底部时会触发绑定的方法。

``` 
<template>
  <!-- ... -->
  <div
    v-infinite-scroll="onLoadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  ></div>
<template>
<script>
export default {
  data() {
    return {
      data [],
      busy: false,
      count: 0
    }
  },
  methods: {
    onLoadMore() {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
}
</script>
```

## Vue-Clampy（截断文本并添加省略号）

* 仓库地址: vue-clampy.
* 安装: npm install --save @clampy-js/vue-clampy
* 这个指令会截断元素里的文本，并在末尾加上省略号。它是用clampy.js实现的。

``` 
<p v-clampy="3">Long text to clamp here</p>
<!-- displays: Long text to...-->
```

## Vue-InputMask（格式化日期）

* 仓库地址: vue-inputmask
* 安装: npm install --save vue-inputmask
* 当你需要在输入框里格式化日期时，这个指令会自动生成格式化文本。基于Inputmask library 开发。

``` 
<input type="text" v-mask="'99/99/9999'" />
```

## Vue-Ripple-Directive（给元素添加波纹动效）

* 仓库地址: vue-ripple-directive
* 安装: npm install --save vue-ripple-directive
* Aduardo Marcos 写的这个指令可以给点击的元素添加波纹动效。

``` 
<div v-ripple class="button is-primary">This is a button</div>
```

## Vue-Focus（让输入框获取焦点）

* 仓库地址: vue-focus
* 安装: npm install --save vue-focus
* 有时候，用户在界面里操作，需要让某个输入框获得焦点。这个指令就是干这个的。

``` 
<template>
  <button @click="focused = true">Focus the input</button>

  <input type="text" v-focus="focused">
</template>
<script>
export default {
  data: function() {
    return {
      focused: false,
    };
  },
};
</script>
```

## V-Blur（添加半透明遮罩）

* 仓库地址: v-blur
* Demo: 戳这里
* 安装: npm install --save v-blur
* 假设你的页面在访客没有注册的时候，有些部分需要加上半透明遮罩。用这个指令可以轻松实现，还可以自定义透明度和过渡效果。

``` 
<template>
  <button
    @click="blurConfig.isBlurred = !blurConfig.isBlurred"
  >Toggle the content visibility</button>

  <p v-blur="blurConfig">Blurred content</p>
</template>
<script>
  export default {
      data () {
        return
          blurConfig: {
            isBlurred: false,
            opacity: 0.3,
            filter: 'blur(1.2px)',
            transition: 'all .3s linear'
          }
        }
      }
    }
  };
</script>
```

## Vue-Dummy(占位数据或图片)

* 仓库地址: vue-dummy
* Demo: available here
* 安装: npm install --save vue-dummy
* 开发 app 的时候，偶尔会需要使用假文本数据，或者特定尺寸的占位图片。用这个指令可以轻松实现。

``` 
<template>
  <!-- the content inside will have 150 words -->
  <p v-dummy="150"></p>
  <!-- Display a placeholder image of 400x300-->
  <img v-dummy="'400x300'" />
</template>
```

