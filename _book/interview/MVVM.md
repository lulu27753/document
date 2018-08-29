## 问题

- 如何理解MVVM
- 如何实现MVVM
- 说一下jQuery和使用框架的区别
- vue 中如何实现响应式
- vue 中如何解析模板
- vue 的整个实现流程

## jQuery实现todoList

```
<div>
	<input type="text" name="" id="txt-title">
	<button id="btn-submit">submit</button>
</div>
<div>
	<ul id="ul-list"></ul>
</div>
<!-- <script type="text/javascript" src="./jquery-3.2.1.js"></script> -->
<script  type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
	var $txtTitle = $('#txt-title')
	var $ulList = $('#ul-list')
	var $btnSubmit = $('#btn-submit')
	$btnSubmit.click(function() {
		var title = $txtTitle.val()
		if (!title) { return }
		var $li = $('<li>' + title + '</li>')
		$ulList.append($li)
		$txtTitle.val('')
	})
</script>
```

## vue实现todoList

```
<div id="app">
	<div>
		<input v-model="title">
		<button v-on:click="add">submit</button>
	</div>
	<ul>
		<li v-for="item in list">{{item}}</li>
	</ul>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.1/vue.min.js"></script>
<script type="text/javascript">
	var vm = new Vue({
		el: '#app',
		data: {
			title: '',
			list: []
		},
		methods: {
			add: function() {
				this.list.push(this.title)
				this.title = ''
			}
		}
	})
</script>
```

## jQuery 和 vue 的区别

- 数据和视图分离，解耦(开放封闭原则)
- 以数据驱动视图，只关心数据变化，DOM操作被封装

## MVVM

- View： DOM
- ViewModel: DOM Listeners + Data Bindings
- Model: Plain JS Objects


- View 通过 DOM Listeners 改变 Model
- Model 通过 Data Bindings 改变 View

## vue(MVVM)的三要素

- 响应式： vue 如何监听到 data 的每个属性变化？
- 模版引擎: vue 的模版如何被解析，指令如何处理？
- 渲染: vue 的模板如何被渲染成html? 以及渲染过程

### vue中如何实现响应式

响应式：修改data属性后，vue立刻监听到；data属性被代理到vm上；

```
var obj = {
	name: 'zhangsan',
	age: 25
}
console.log(obj.name) // 获取属性的时候，如何监听到？
obj.age = 26 // 赋值属性的时候，如何监听到？
```

#### Object.defineProperty

```
var obj = {}
var _name = 'zhangsan'
Object.defineProperty(obj, 'name', {
	get: function() {
		console.log('get', _name) // 监听
		return _name
	},
	set: function(newVal) {
		console.log('set'， newVal) // 监听
		_name = newVal
	}
});
console.log(obj.name)
obj.name = 'lisi'
```

#### 模拟实现

```
var vm = {}
var data = {
	price: 100,
	name: 'zhangsan'
}
var key, value
for (key in data) {
	// 使用闭包，保证key的独立作用域
	(function(key){
		Object.defineProperty(mv, key, {
			get: function() {
				console.log('get')
				return data[key]
			},
			set: function() {
				console.log('set')
				data[key] = newVal
			}
		})
	})(key)
}
```

### 模板引擎

模板：
- 本质：字符串
- 模板最终必须转换成JS代码，即模版最终要转换成一个JS函数(render())
	- 与html格式很像，但有很大区别
	- 有逻辑: 如v-if v-for等，必须用JS才能实现(图灵完备)
	- 最终还要转换为html来显示


### 渲染

#### with

```
var obj = {
	name: 'zhangsan'
	age: 20,
	getAddress: function() {
		alert('beijing')
	}
}

// 不用with
function fn() {
	alert(obj.name)
	alert(obj.age)
	obj.getAddress()
}
fn()

// 使用with
function fn1() {
	with(obj) {
		alert(name)
		alert(age)
		getAddress()
	}
}
fn1()
```

#### render函数


- 模板中的所有信息都包含在了render函数中
- this: 即 vm 
- price: 即 this.price, 即 vm.price, 即 data 中的 price
- `_c`: 即 `this._c`, 即 `vm._c`

```
<div id="app">
	<p>{{price}}</p>
</div>
```

```
// this即 vm 实例
with(this){
	return _c(
		'div',
		{
			attrs: {"id": "app"}
		},
		[
			_c('p',[_v(_s(price))])
		]
	)
}
```

- `_c` : 返回DOM节点，createElement()
- `_v` : 创建文本节点，createTextVNode()
- `_s` : 转换成字符串，toString()
- `_l` : renderList()

> 在vue源码中搜索	`code.render`

```
var code = generate(ast, options);
  console.log('code.render', code.render); // 添加该行
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
```
> 从而劫持到生成todoList的render函数

- `v-model` 是怎么实现的？
- `v-on:click` 是怎么实现的？
- `v-for` 是怎么实现的？

```
with(this){
	return _c(
		'div',
		{ attrs: {"id":"app"} },
		[_c('div',
			[_c('input',
				{
					directives:[{
						name:"model",
						rawName:"v-model",
						value:(title),
						expression:"title"
					}],
					domProps:{"value":(title)},
					on:{
							"input":function($event){
								if($event.target.composing)return;
								title=$event.target.value
							}
					}
				}),
				_v(" "),
				_c(
					'button',
					{on:{"click":add}},
					[
						_v("submit")
					]
				)]),
			_v(" "),
			_c(
				'ul',
				_l(
					(list),
					function(item){return _c('li',[_v(_s(item))])})
			)
		 ])
}
```

- `vm._c`	其实就相当于snabbdom中的h()
- `render` 函数执行之后，返回的是vnode
- updateComponent() 中实现了vdom 的 patch
- 页面首次渲染执行updateComponent()
- data中每次修改属性，执行updateComponent()

```
vm._update(vnode) {
	const prevVnode = vm._vnode
	vm._vnode = vnode
	if(!prevVnode) {
		vm.$el = vm.__patch__(vm.$el, vnode)
	} else {
		vm.$el = vm.__patch__(prevVnode, vnode)
	}
}
function updateComponent() {
	vm._update(vm._render())
}
```

## vue 的实现流程

- 解析模版成render函数
	- with 的用法
	- 模板中的所有信息都被render函数包含
	- 模板中用到的data中的属性，都变成了JS变量
	- 模板中的v-model v-for v-on都变成了JS逻辑
	- render()返回vnode
- 响应式开始监听
	- Object.defineProperty()
	- 将data的属性代理到vm上
- 首次渲染，显示页面，且绑定依赖
	- 初次渲染，执行`updateComponent()`,执行`vm._render()`
	- 执行`vm._render()`，会访问到`vm.list` 和 `vm.title`
	- 会被响应式的get方法监听到
	- 执行`updateComponent()`,会执行`vm.__patch__()`
	- patch将vnode渲染成DOM，初次渲染完成
- data属性变化，触发rerender
	- 修改属性，被响应式的set监听到
	- `set`中执行`updateComponent()`
	- `updateComponent()`重新执行`vm._render()`
	- 生成的vnode和prevVnode, 通过patch进行比对
	- 渲染到html中




为何要监听get,直接监听set不行吗？
- data中有很多属性，有些被用到，有些可能不被用到
- 被用到的会走get,不被用到的不会走get
- 未走get中的属性，set的时候我们也无需关心，从而避免不必要的重复渲染

## 脏数据检测

当触发了指定事件后会进入脏数据检测，`$digest`











