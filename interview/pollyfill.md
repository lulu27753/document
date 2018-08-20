## 问题

> 模拟实现call 、apply 和 bind


## 解答

#### 模拟实现call 和 apply

- 改变 this 的指向
- call 可以接收一个参数列表
- apply 只接受一个参数数组
- bind 返回一个函数，并可以实现柯里化
- 不传入第一个参数，那么默认为 window
- 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```
Function.prototype.myCall = function(context) {
	var context = context || window
}



```

#### 模拟实现bind
