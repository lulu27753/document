## this 介绍

this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境

this的指向
- 作为对象的方法调用：指向该对象
- 作为普通函数调用：指向全局对象(严格模式下：undefined)
- 构造器调用
- Function.prototype.call 或 Function.prototype.apply 调用


document.getElementById()的内部实现中需要用到this，并且这个this被期望指向document

```
document.getElementById = (
	function(func) {
		return function() {
			return func.apply(document, arguments)
		}
	}
)(document.getElementById)

var getId = document.getElementById
```

## call && apply

当使用 call 或 apply 时，如果我们传入的第一个参数为null, 函数体内的 this 会指向默认的宿主对象，在浏览器中则是window.但是在严格模式下，函数体内的 this 还是为 null

有时候使用 call 或 apply 的目的不在于指定 this 指向，而是借用其他对象的方法

如 Math.max.apply(null, [1,2,3,4,5]) 等同于 Math.max(...[1,2,3,4,5])

### 改变this的指向

```
Function.prototype.bind = function() {
	var self = this // 保存原函数
	var context = [].shift.call(arguments) // 需要绑定的 this 上下文
	var args = [].slice.call(arguments) // 剩余的参数转成数组
	return function() { // 返回一个新的函数
		return self.apply(context, [].concat.call(args, [].slice.call(arguments))) 
		// 执行新的函数的时候，会把之前传入的context当作新函数体内的this
		// 并且组合两次分别传入的参数，作为新函数的参数
	}
}
var obj = {
	name: 'lulu'
}
var func = function(a, b, c, d) {
	alert(this.name)
	alert([a, b, c, d])
}.bind(obj, 1, 2)
func(3, 4)
```

### 借用其他对象的方法

借用构造函数，从而实现一些类似继承的效果































