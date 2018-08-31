# Vue

* 双向数据绑定
* 路由
* 状态管理
* 动画
* 组件化
* SSR

## vue 组件资源

[vuetify]()

[quasar]()

[vue-beauty2](https://fe-driver.github.io/vue-beauty/#/components/morePanel)

[ant-design | GitHub](https://github.com/vueComponent/ant-design)

[Element | 官网](http://element-cn.eleme.io/#/zh-CN/component/collapse)

[element | Github](https://github.com/ElemeFE/element)

[iView | 官网](https://www.iviewui.com/)

[Antue](https://zzuu666.github.io/antue/#/components/switch/index/zh)

[wxc-lottery-rain 红包雨 - Weex Ui](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-lottery-rain/)

[Vuesax](https://lusaxweb.github.io/vuesax/vuesax/)

[vant](https://github.com/youzan/vant)

[KangarooUI](http://kangarooui.waimai.meituan.com/2.0/extends/)

## vue-cli

```bash
sudo npm i vue-cli -g
vue init webpack music
cd music
npm run dev
```

## 模板语法

模板语法：声明式地将DOM绑定至底层Vue实例的数据；vue将模版编译成虚拟DOM渲染函数

### 插值

* 文本：{{}}
  * 只支持单个表达式，不支持语句和流控制
  * 不能使用用户自定义的全局变量，只能使用Vue白名单内的全局变量
  * 格式化文本
    * 管道符(|)对数据进行过滤
    * 过滤规则：通过给Vue实例添加选项filters来设置
    * 过滤器可以串联也可以接收参数
* 原始HTML：v-html

### 指令

* 当表达式的值改变时，相应地将某些行为应用到DOM上，所以不到万不得已不要主动操作DOM
* 带有v-前缀的特殊属性
* 值是单个JS表达式(v-for是例外)
* 当值改变时，将其产生的连带影响，响应式地作用于DOM
* v-pre：跳过这个元素和它的子元素的编译过程
* v-bind: 动态更新HTML元素上的属性
* v-on：绑定事件监听器
* v-cloak: 在Vue实例结束编译时从绑定的HTML元素上移除，经常和display:none配合使用，防止插值表达式出现的屏幕闪动问题

### 参数

一些指令可以接收一个参数，在指令名称后以冒号表示

### 修饰符

以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特殊方式绑定

### 缩写

v-bing：`：`
v-on: `@`

## 计算属性和侦听器

应该将复杂和多复用逻辑放入到计算属性中

computed：

* 计算属性的getter()是没有副作用的
* this指向Vue实例
* 计算属性是基于它们的依赖进行缓存的，对于依赖没有发生改变的情况，会立即返回之前的计算结果，而不必再次执行函数
* 可以将同一函数定义为一个方法（method）而不是一个计算属性，但是调用方法总会再次执行函数
* 大多数情况下更适合使用计算属性而不是侦听属性(watch)
* 然而在数据变化时或开销较大的操作时，应该使用watch，其允许我们执行异步操作(访问一个API)，限制我们执行该操作的频率，并在得到最终结果前，设置中间状态，这些computed无法做到
* 计算属性默认只有getter，在需要的时候也可以提供一个setter
* 计算属性可以依赖多个Vue实例的数据，只要其中任一数据变化，计算属性就会重新执行，视图也会更新。
* 计算属性可以依赖其他计算属性
* 计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据。你写的一个组件所用得到的数据需要依赖他人的组件提供。

## class 与 style

### class

* 动态地切换class，也可以和普通的class属性共存
* 对象语法：`v-bind:class={}`
* 数组语法：`v-bind:class=[]`
* 数组对象语法：`v-bind:class=[{}, {}]`
* 当在一个自定义组件上使用`class`时，这些类将被添加到该组件的根元素上面，这个元素上已经存在的类不会被覆盖。
* 当class的表达式过长或逻辑复杂时，可以使用data或computed

### style

* 对象语法：`v-bind:style={}`，常常结合计算属性使用
* vue会自动添加浏览器引擎的css属性前缀

## 条件渲染

* `v-if` `v-else-if` `v-else`
* 包裹元素：`<template></template>`
* 用`key`管理可复用的元素,以表达两个元素是完全独立的，不要复用它们
* 有更高的切换开销
* `v-for`比`v-if`有更高的优先级

* `v-show`
* 其元素始终会被渲染并保留在DOM中，只是简单的切换元素的css属性`display`
* 有更高的初始渲染开销

## 列表渲染

* 拥有对父作用域属性的完全访问权限
* 数组：`v-for="(item, index) in items"`
* 对象：`v-for="(value, key, index) in object"`
* 唯一ID：`:key="item.id"`
* 组件有自己的独立作用域，任何数据都不会被自动传递到组件里，用props将迭代数据传递到组件里

### 数组

变异方法:会改变被方法调用的原始数组

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

非变异数组：总是返回一个新数组

* filter()
* concat()
* slice()

### 对象

vue不能检测对象属性的添加或删除

## 事件处理

* `v-on：<event>`
* 在 `methods` 对象中定义事件处理方法,用 JavaScript 直接调用方法,也可以在内联 JavaScript 语句中调用方法
  * methods 中定义的方法可以接受参数
* `$event`传入事件处理方法以访问原始的DOM事件
* 调用的方法名后可以不跟括号"()",如果该方法有参数，默认会将原生事件对象event传入
* 当ViewModel销毁时，所有的事件处理器都会自动删除，无须自己清理。

### 事件修饰符：

* .stop： 阻止单击事件继续传播
* .prevent：提交事件不再重载页面
* .capture：添加事件监听器时使用事件捕获模式，即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
* .self：只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的
* .once：点击事件将只会触发一次
* .passive：滚动事件的默认行为 (即滚动行为) 将会立即触发，而不会等待 `onScroll` 完成，这其中包含 `event.preventDefault()` 的情况。不要和 .prevent 一起使用，因为 .prevent 将会被忽略。
* .native：在组件的根元素上监听一个原生事件
* .sync：只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器

### 按键修饰符

* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

### 系统修饰符

* .ctrl
* .alt
* .shift
* .meta(Mac下是Command,Windows下是窗口键)

### 鼠标按钮修饰符

* .left
* .right
* .middle

## 表单输入绑定

* `v-model`创建双向数据绑定：默认会使用 value prop 和 input 事件
* 会忽略表单元素value | checked | selected 的初始值
* option && checkbox
  * 单独使用：v-model绑定一个布尔值
  * 组合使用：v-model结合value值，多个框都绑定到同一个数组类型的数据
* selected:
  * option如果含有value属性，v-model就会优先匹配value的值，如果没有就直接匹配option的text
  * 多选：添加multiple属性

### 修饰符

* .lazy: 在“change”事件而非“input”事件更新，即意味着不是实时同步，而是在失焦或按回车时才更新
* .number: 自动将用户的输入值转为数值类型
* .trim: 自动过滤用户输入的首尾空白字符

## 组件

* vue组件API来源：
  * props传递数据
  * events触发事件
  * slot内容分发
* 要在父实例中使用组件，必须要在实例创建前注册
* 注册全局组件：`Vue.component(tagName, optionsObject)`
* 创建根实例：`new Vue({el: '#example'})`
* 在`<table>``<ol>``<ul>``<select>`内使用组件是无效的，可以使用特殊属性`is`来挂载组件
* data和实例的使用有区别，必须是函数，并且将数据return出去
  * JS对象是引用关系，所以如果return出的对象引用了外部的一个对象，那这个对象就是共享的，任何一方修改都会同步。

* 局部注册：`components`选项注册仅在其作用域中可用的组件，使组件可以嵌套

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```

### 父子组件通信

* props down， emit up
* 子组件显式声明props
  * 数组：`props:['属性名','驼峰属性名']`
  * 对象：在prop需要验证时`props:{propA: {type: Number, required: true},}`
* JS中使用驼峰命名，在HTML中使用短横线分格式命名(HTML不区分大小写)
* v-bind 
  * 动态地将prop绑定到父组件的数据；
  * 把一个对象的所有属性作为prop进行传递，可以使用不带任何参数的v-bind(即用v-bind而不是v-bind:prop-name)；
  * 不使用v-bing，直接传递数字、布尔值、数组、对象，传递的仅仅是字符串；
* 单向数据流：尽可能将父子组件解耦，避免子组件无意中修改了父组件的状态。不应该在子组件内部改变prop：
    * Prop作为初始值传入后，子组件想把它当作局部数据来用：定义一个局部变量，并用prop的值初始化它
    * Prop作为原始数据传入，由子组件处理成其它数据输出：定义一个计算属性，处理prop的值并返回
* 对于多数特性来说，传递给组件的值会覆盖组件本身设定的值。class 和 style 特性却会做合并(merge)操作
* 每个Vue实例都实现了事件接口：
    * $on(eventName): 监听事件，父组件通过v-on监听子组件触发的事件，不能用$on监听子组件释放的事件；并不是addEventListener的别名
    * $emit(eventName, optionalPayload): 触发事件；并不是dispatchEvent的别名

### 非父子组件通信

* 中央事件总线bus：使用一个空的 Vue 实例作为事件总线
* 状态管理模式：vuex
* 父链：高耦合，不推荐
  * this.$parent:子组件可以直接访问该组件的父实例或组件
  * this.$children: 父组件访问它的所有子组件，可以递归向上或向下访问，直到根实例或最内层的组件
* 子组件索引：用特殊的属性ref来为子组件指定一个索引名称,并在父组件内通过this.$refs来访问指定名称的子组件
  * $refs只在组件渲染完成后才填充，并且它是非响应式的，它仅仅作为一个直接访问子组件的应急方案，应当避免在模板或计算属性中使用$refs.

### prop验证

type：

* String
* Number
* Boolean
* Function
* Object
* Array
* Symbol

### 插槽:内容分发

* 内容分发(`<slot name='choose_name'>`):混合父组件的内容与子组件自己的模版。被分发的内容会在父作用域内编译。
* slot是组件的一块HTML模版，这块模版显示不显示，以及怎样显示由父组件来决定。但是插槽显示的位置却由子组件自身决定，slot写在组件template的哪块，父组件传过来的模版将来就显示在哪块。
* 编译作用域
  * this.refs.ref.children的作用域是父组件的数据
  * 父组件模版的内容在父组件作用域内编译，子组件模版的内容在子组件作用域内编译。父组件模板并不感知子组件的状态。
  * slot分发的内容，作用域是在父组件上的
  * 子组件`<slot>`内的备用内容，它的作用域是子组件本身
* 单个插槽 | 默认插槽 | 匿名插槽：
  * 一个组件中只能有一个该类插槽
  * 除非子组件模板包含至少一个插槽，否则父组件的内容将会被丢弃。
  * 备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容
  * 没有使用name特性的slot，它将作为默认slot出现，父组件没有使用slot特性的元素与内容都将出现在这里
* 具名插槽
  * 可以有很多个，只要name属性不同就可以
  * 父组件通过html模板上的slot属性关联具名插槽，没有slot属性的html模板默认关联匿名插槽
* 作用域插槽|带数据的插槽：
  * 用作一个（能被传递数据的)可重用模板，来代替已经渲染好的元素
  * 使用场景：既可以复用子组件的slot,又可以使slot内容不一致
  * 样式父组件说了算，但内容可以显示子组件插槽绑定的
  * 因为单个插槽和具名插槽不绑定数据，所以其父组件提供的模版既要包括样式也要包括内容；
  * 作用域插槽，父组件只需要提供一套样式，数据可以使用子组件插槽自己绑定的数据
  * `<template slot-scope="data">`
* 获取slot：
  * $slots: 可以访问某个具名slot
  * this.$slot.default: 包括了所有没有被包含在具名slot中的节点


### 动态组件(keep-alive)

在同一个挂载点动态切换多个组件：
* 通过使用保留的 `<component>` 元素，并对其 is 特性进行动态绑定
* `keep-alive`: 把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染

### 递归组件

* 给组件设置name属性：可以在组件自己的模版内可以递归地调用自己
* 必须给一个条件来限制递归数量，否则抛错：max stack size exceeded
* 开发具有未知层级关系的独立组件，如级联选择器 | 树形控件

### 内联模板

* inline-template:设置该特性，组件会把它的内容当作模板，而不是把它当内容分发
* 父组件和子组件中如果声明了同名数据，会优先使用子组件的数据

### 动态组件

* `<component :is="comName">`用来动态地挂载不同的组件，使用is特性来选择要挂载的组件

### 异步组件

* Vue允许将组件定义为一个工厂函数，动态地解析组件，只要在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。
* 工厂函数
  * 接收一个resolve回调，在收到从服务器下载的组件定义时调用
  * 调用reject(reason)指示加载失败

### $nextTick(function(){})

* 用来知道什么时候DOM更新完成

### X-Templates

在`<script>`标签里使用 `type="text/x-template"`, 并且指定一个`id`，将这个`id`给`template`
将模版和组件的其他定义隔离了，不推荐滥用

### 手动挂载实例

* Vue.extend(): 基础的Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象
* $mount(): 手动地挂载一个未挂载的实例。这个方法返回实例自身，因而可以链式调用其他实例方法

## 实例属性和方法

* 以$开头
* $el: 访问挂载vue实例的DOM元素

## 生命周期钩子函数

* created: 实例创建完成后，此阶段完成了数据的观测等，但尚未挂载，$el还不可用，需要初始化处理一些数据时比较有用
* mounted: el挂载到实例上后调用，一般第一个业务逻辑会在这里开始
* beforeDestroy: 实例销毁之前调用。主要解绑一些使用addEventListener监听的事件及定时器

## 插件

```js
// 通过公开方法install()注册插件
MyPlugin.install = function (Vue, options) {
  // 全局注册组件(指令等功能资源类似)
  Vue.component('component-name', {
    // 组件内容
  })
  // 添加实例方法
  Vue.prototype.$Notice = function () {
    // 逻辑。。。
  }
  // 添加全局方法或属性
  Vue.globalMethod = function () {
    // 逻辑。。。
  }
  // 添加全局混合
  Vue.mixin({
    mounted: function () {
      // 逻辑。。。
    }
  })
}
```

// 通过Vue.use()来使用插件

```js
Vue.use(MyPlugin)
Vue.use(MyPlugin, {
  // 参数
})
```

## 资源

[Vue.js官网](https://cn.vuejs.org/v2/guide/)

[这可能是vue-cli最全的解析了](https://juejin.im/post/5b2872516fb9a00e8626e34f?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

