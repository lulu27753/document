## 问题

- JS内置的全局函数和对象有哪些？
- DOM是哪种基本的数据结构？
- DOM操作的常用API有哪些？
- DOM节点的 attribute 和 property 有何区别？
- 如何检测浏览器的类型
- 拆解url的各部分
- 编写一个通用的事件监听函数
- 描述事件冒泡流程
- 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件
- 手动编写一个ajax,不依赖第三方库
- 跨域的几种实现方式
- 请描述一下cookie, sessionStorage, localStorage的区别

## DOM 操作

- Document + Object + Model
- xml => html
- 树
- 浏览器把拿到的html代码，结构化为一个浏览器能识别并且JS可操作的一个模型

```Java
var div1 = document.getElementById('div1') // 元素
var divList = document.getElementByTagName('div') // 集合

var containerList = document.getElementsByClassName('.container') // 集合
var pList = document.querySelectorAll('p') // 集合

var p = pList[0]
console.log(p.style.width) // 获取样式
p.style.width = '100px' // 修改样式
console.log(p.className) // 获取class
p.className = 'p1' // 修改class

// 获取 nodeName 和 nodeType
console.log(p.nodeName)
console.log(p.nodeType) // 节点类型 text:3 标签元素：1

p.getAttribute('data-name')
p.setAttribute('data-name', 'p')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 30px')


```

- property：JS对象的属性
- attribute: 文档标签的属性

- 获取节点：getElementById() | getElementByTagName() | getElementsByClassName() | querySelectorAll()
- 新增节点：createElement() | appendChild()
- 获取父元素：parentElement 
- 获取子元素：childNodes
- 删除节点：removeChild()

```java
var p = document.createElement('p')
p.innerHTML = 'new p'
var div1 = document.getElementById('div1')
div1.appendChild(p)

var p4 = document.getElementById('p4')
console.log(p4.parentElement)
console.log(div1.childNodes)
div1.removeChild(childNodes[1])
```

## BOM 操作

- Browser + Object + Model

### navigator(浏览器)

```
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

### screen(屏幕)

```
console.log(screen.width)
console.log(screen.height)
```

### location(地址栏)

```
console.log(location.href)
console.log(location.protocol)
console.log(location.hostname)
console.log(location.pathname)
console.log(location.search)
console.log(location.hash)
```

### history(历史)

```
history.back()
history.forward()
```

## 事件

### 通用事件绑定

```
var btn = document.getElementById('btn1')
btn.addEventListener('click', function(event) {
	console.log('clicked')
})

// 通用事件绑定
function bindEvent(elem, type, selector, fn) {
	if (fn == null) {
		fn = selector
		selector = null
	}
	elem.addEventListener(type, function(e) {
		var target
		if (selector) {
				target = e.target
				if (target.matches(selector)) {
					fn.call(target, e)
				}
			} else {
				fn(e)
			}
	})
}

// 测试代码
// 使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function(e) {
	console.log(this.innerHTML)
})


// 不使用代理
var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
	e.preventDefault() // 阻止默认行为
	alert('clicked')
})
```

PS: 关于IE低版本的兼容性：attachEvent()


### 事件冒泡

> addEventListener.html
冒泡是从下向上，DOM元素绑定的事件被触发时，此时该元素为目标元素，目标元素执行后，它的的祖元素绑定的事件会向上顺序执行

```
<body>
	<div id="div1">
			<p id="p1">激活</p>
			<p id="p2">取消</p>
			<p id="p3">取消</p>
			<p id="p4">取消</p>
		</div>
		<div id="div2">
			<p id="p5">取消</p>
			<p id="p6">取消</p>
		</div>
</body>

var p1 = document.getElementById('div1')
var body = document.body
bindEvent(p1, 'click', function(e) {
		e.stopPropatation()
		alert('激活')
})
bindEvent(body, 'click', function(e) {
		alert('取消')
})
```
 

### 代理

```
<div id="div1">
	<a href="#">a1</a>
	<a href="#">a2</a>
	<a href="#">a3</a>
	<a href="#">a4</a>
</div>

var div1 = document.getElementById('div1')
div1.addEventListener('click', function(e) {
		var target = e.target
		if (target.nodeName === 'A') {
			alert(target.innerHTML)
		}
	})
```

- 代码简洁
- 减少浏览器内存占用

## Ajax

### XMLHttpRequest

```Java
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api', false)
// 每次readyState的变化都会触发onreadystatechange这个异步函数的执行
xhr.onreadystatechange = function() {
	// 异步执行
	if (xhr.readyState == 4) 
			if (xhr.status == 200) {
			alert(xhr.responseText)
		}
	}
}
xhr.send(null)
```

PS：IE 低版本使用 ActiveXObject

### 状态码说明

> readyState
- 0: (未初始化) 还没有调用send()方法
- 1: (载入) 已调用send()方法，正在发送请求
- 2: (载入完成) send()方法执行完成，已经接收到全部响应内容
- 3: (交互) 正在解析响应内容
- 4: (完成) 响应内容解析完成，可以在客户端调用了

> status
- 2XX: 表示成功处理请求
- 3XX: 需要重定向，浏览器直接跳转
- 4XX: 客户端请求错误，如404
- 5XX: 服务器端错误

### 跨域

##### 什么是跨域

> 默认端口：

- http：8080
- https: 443

> 跨域

- 浏览器有同源策略，不允许ajax访问其他域的接口
- 跨域条件： 协议 | 域名 | 端口，满足其中一个
- 允许跨域的三个标签：`<img>` | `<link>` | `<script>`

> 三个标签的使用场景

- `<img>`用于打点统计，统计网站可能是其他域
- `<link>``<script>`可以使用CDN
- `<script>`可以用于JSONP

> 跨域注意事项

- 所有的跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现了漏洞

##### JSONP



##### 服务器端设置http header

```
// 注意：不同后端语言的写法可能不一样

// 第二个参数填写允许跨域的域名称，不建议直接写“*”
response.setHeader('Access-Control-Allow-Origin', 'http://a.com, http://b.com')
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

// 接收跨域的cookie
response.setHeader('Access-Control-Allow-Credentials', 'true')

```


## 存储

### cookie

- 本身用于客户端和服务端通信
- 但是其有本地存储的功能，于是就被“借用”
- 本质是字符串
- 使用document.cookie = ... 获取和修改即可
- 存储量太小，只有4KB
- 所有的http请求都带着，会影响获取资源的效率
- API简单，需要封装才能用document.cookie = ..

### sessionStorage 和 localStorage

- HTML5专门为存储而设计，最大容量5M
- API简单易用
	- localStorage.setItem(key, value);
	- localStorage.getItem(key);

### 坑

- IOS Safari 隐藏模式下
- localStorage.getItem()会报错
- 建议统一使用try-catch 封装

## 解答


> JS内置的全局函数和对象有哪些？

	- String | Number | Boolean | Object | Array | Function | RegExp | Date | Math | JSON |

	- window | document | navigator.userAgent

> DOM是哪种基本的数据结构？

	树

> DOM操作的常用API有哪些？
	- 获取节点：getElementById() | getElementByTagName() | getElementsByClassName() | querySelectorAll()
	- 新增节点：createElement() | appendChild()
	- 获取父元素：parentElement 
	- 获取子元素：childNodes
	- 删除节点：removeChild()

> DOM节点的 attribute 和 property 有何区别？

	- property是一个JS对象的属性的修改和获取
	- attribute是对html标签属性的修改和获取

> 如何检测浏览器的类型

```
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

> 拆解url的各部分

```
console.log(location.href)
console.log(location.protocol)
console.log(location.hostname)
console.log(location.pathname)
console.log(location.search)
console.log(location.hash)
```

> 编写一个通用的事件监听函数
	```
	var btn = document.getElementById('btn1')
	btn.addEventListener('click', function(event) {
		console.log('clicked')
	})

	// 通用事件绑定
	function bindEvent(elem, type, selector, fn) {
		if (fn == null) {
			fn = selector
			selector = null
		}
		elem.addEventListener(type, function(e) {
			var target
			if (selector) {
					target = e.target
					if (target.matches(selector)) {
						fn.call(target, e)
					}
				} else {
					fn(e)
				}
		})
	}

	// 测试代码
	// 使用代理
	var div1 = document.getElementById('div1')
	bindEvent(div1, 'click', 'a', function(e) {
		console.log(this.innerHTML)
	})


	// 不使用代理
	var a = document.getElementById('link1')
	bindEvent(a, 'click', function(e) {
		e.preventDefault() // 阻止默认行为
		alert('clicked')
	})
	```

> 描述事件冒泡流程

	- DOM 树形结构
	- 事件冒泡
	- 阻止冒泡
	- 冒泡的应用：代理


> 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

	- 使用代理
	- 代理的好处

> 手动编写一个ajax,不依赖第三方库

	```Java
	var xhr = new XMLHttpRequest()
	xhr.open('GET', '/api', false)
	// 每次readyState的变化都会触发onreadystatechange这个异步函数的执行
	xhr.onreadystatechange = function() {
		// 异步执行
		if (xhr.readyState == 4) 
				if (xhr.status == 200) {
				alert(xhr.responseText)
			}
		}
	}
	xhr.send(null)
	```

> 跨域的几种实现方式

	- JSONP
	- 后端设置http header

> 请描述一下cookie, sessionStorage, localStorage的区别

- 容量
- 是否会携带到ajax中
- API易用性


