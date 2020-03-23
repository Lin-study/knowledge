# 简介

当组件可以是单行文本或者多行文本时，我们的组件生命就需要这样写，变得难以维护

``` HTML
 <div>
   <textarea v-if="multiline" v-model="content" :name="name" :placeholder="placeholder" :aria-invalid="false">
   <input v-else v-model="content" :name="name" :placeholder="placeholder" :aria-invalid="false">
 </div>
```

## 使用render函数（当出现多元素嵌套时，可读性非常差）

如果在组件上定义了render方法，则 Vue 将忽略template定义。

1. render方法从Vue获取一个createElement助手。
2. 我们以编程方式定义我们的标签。
3. 然后，我们创建标签并将其属性，类等作为对象传递。我们可以传递给createElement的选项很多。
4. 我们返回新创建的元素进行渲染。

``` JS
 export default {
   name: 'TextField',
   render(createElement) {
     const tag = this.multiline ? 'textarea' : 'input'

     return createElement(tag, {
       class: {
         'text-input': true,
         'is-disabled': false
       },
       attrs: {
         name: this.name,
         placeholder: this.placeholder,
         'aria-invalid': false
       }
     })
   }
 }
```

## 配置 Vue 以使用 JSX

### 安装

npm install --save-dev babel-preset-vue-app

### 添加

在.babelrc文件中，添加

``` 
{
 "presets": ["vue-app"]
}
```

### 使用

``` 
render (createElement) {
  const inputAttributes = {
    class: 'input-field has-outline', // class definition
    onClick: this.handleClick // event handler
    backdrop: false // custom prop
  }
  const inputMarkup = this.multiline ? <textarea {...inputAttributes}></textarea> : <input {...inputAttributes}/>
  return inputMarkup
}
```

