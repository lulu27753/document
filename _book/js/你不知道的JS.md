## polyfilling

[ECMAScript Shims](https://github.com/es-shims/)

## transpiling

[Babel | ES6 -> ES5](https://babeljs.io/)

[Traceur | ES6+ -> ES5](https://github.com/google/traceur-compiler)

## ES6在线使用工具

[Babel](https://babeljs.io/repl/)

## 语法

- 应该总是把let声明放在块的最前面。如果有多个变量需要声明的话，建议只用一个let
- let声明归属于块作用域，但是直到在块中出现才会被初始化
- 在let声明/初始化之前访问let声明的变量会导致错误
- for循环头部的let i 不只为for循环本身声明了一个i, 而是为循环的每一次迭代都重新声明了一个新的i
- 把 arguments 转换成一个真正的数组`Array.prototype.slice.call(arguments)`
- JS 设计原则： `undefined` 意味着缺失
- Function.prototype 本身时一个没有操作的空函数
- 对象字面值：target <-- source
- 对象解构赋值：source --> target

```
// 参数默认值
function foo(x = 11, y = 31) {
	// 相当于 x !== undefined ? x : 11	
	console.log( x + y)
}
foo(0, 42) // 42
foo(5, undefined) // 丢了undefined
foo(5, null) // null被强制转换为0
```




