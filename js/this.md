
## this

this的指向在函数定义的时候是确定不了的，
只有函数执行的时候才能确定this到底指向谁，
实际上this的最终指向的是那个调用它的对象

## 总结

- 全局环境：this指向window
- 函数调用：
	- 严格模式：this指向window
	- 非严格模式：this指向undefined
- 对象：
	- 指向调用函数的对象
	- 指向离被调用函数最近的对象
- 原型链中的this：
	- 指向调用它的对象
- 构造函数中的this:
	- 指向被创建的新对象
- call && apply && bind
	- 指向传入的第一个参数
- DOM事件
	- 指向触发该事件的元素
- 内联事件
	- 被内联处理函数调用: 指向监听器所在的DOM元素
	- 被包括在函数内部执行: 等同于`函数调用`的情况
- setTimeout & setInterval
	- this指向window
- 箭头函数
	- 不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值


## 资源

[彻底理解js中this的指向](https://www.cnblogs.com/pssp/p/5216085.html)