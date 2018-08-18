## 问题

- JS 中使用typeof能得到哪些类型
- 何时使用 === ？ 何时使用 ==？
- JS中有哪些内置函数？
- JS变量按照存储方式区分为哪些类型，并描述其特点
- 如何理解JSON
- 简述如何实现一个模块加载器，实现类似require.js的基本功能
- 实现数组的随机排序

## 变量类型和计算

### 值类型

> 每个变量都可以存储相应的值，不会相互影响

```
var a = 100
var b = a
a = 200
console.log(b) // 100
```

### 引用类型

> 存储的是指向对象的指针；对象|数组|函数

```
var a = {age: 200}
var b = a
b.age = 21
console.log(a.age) // 21
```
### typeof

只能区分值类型

```
typeof undefined //undefined
typeof 'abc' // string
typeof 123 // number
typeof true // boolean

typeof console.log // function
typeof {} // object
typeof [] // object
typeof null // object 注意⚠️
```

### 强制类型转换

##### 字符串拼接

```
var a = 100 + 10 // 110
var b = 100 + '10' // '10010'
```
##### == 运算符

```
100 == '100' // true
0 == '' // true
null == undefined //true
```

##### if语句

> 将条件语句强制转换成boolean;
> false: 0 | '' | NAN | null | undefined | false


```
var a = true
if (a) {}
var b = 100
if (b) {}
var c = ''
if (c) {}
```

##### 逻辑运算

```
console.log(10 && 0) // 0
console.log('' && 'abc') // 'abc'
console.log(!window.abc) // true

// 判断一个变量会被当作 true 还是 false
var a = 100
console.log(!!a)
```

## 解答

> JS 中使用typeof能得到哪些类型

	string | number | boolean | undefined | object | function

> 何时使用 === ？ 何时使用 ==？

	```
	var obj = {}
	if(obj.a == null) {
		// 相当于obj.a === null || obj.a === undefined 的简写形式
		// 这是 jQuery 源码中推荐的写法
		}

	function (a, b) {if(a==null){...}}
	```
	看一个对象的属性是否存在的时候用“==”，除此之外全部用“===”

> JS中有哪些内置函数？

	String | Number | Boolean | Object | Array | Function | Date | RegExp | Error

	Math 是内置对象，不是函数


> JS变量按照存储方式区分为哪些类型，并描述其特点

	- 值类型：每个变量都可以存储相应的值，不会相互影响
	- 引用类型：存储的是指向对象的指针；对象|数组|函数


> 如何理解JSON

	是JS的内置对象而已，类似于Math;同时是一种数据格式
	```
	JSON.stringify({a:10, b:20})
	JSON.parse('{"a":10, "b":20}')
	```

> window.onload 和 DOMContentLoaded 的区别

> 用JS创建10个`<a>`标签，点击的时候弹出对应的序号
	
> 简述如何实现一个模块加载器，实现类似require.js的基本功能



















