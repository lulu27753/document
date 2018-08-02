## 定义

- 用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作Promise，帮助我们处理队列，即链式调用

## 异步

- 事件侦听与响应：先注册然后执行
- 回调函数：当外部函数执行完了之后，内部函数就会被执行
- 回调主要出现在Ajax和File API
- Node 无阻塞高并发，异步操作是保障

## 回调

- 嵌套层次很深，难以维护
- 无法正常使用 return 和 throw
- 无法正常检索堆栈信息
- 多个回调之间难以建立联系

## Promise

- 执行器
  - resolve
  - reject
- then
  - 如果执行的是resolve，则执行第一个参数
  - 如果执行的是reject，则执行第二个参数

- Promise是一个代理对象，它和原先要进行的操作并无关系
- 它通过引入一个回调，避免更多的回调


## 3个状态

- pending【待定】初始状态
- fulfilled【实现】操作成功
- rejected 【被否决】操作失败

Promise状态发生改变，就会触发.then里的响应函数处理后续步骤
Promise状态一经改变，不会再变


## then

* return 另一个promise
* return 一个同步的值（或者undefined)
* throw 一个同步异常



## 习题

下面的四种Promise的区别，假设doSomething()和doSomethingElse()返回的都是Promise对象

1.
doSomething().then(function() {
	return doSomethingElse();
}).then(finalHandler);
doSomething
|----------|doSomethingElse(undefined)
					|-------------------------|


2.
doSomething().then(function() {
	doSomethingElse();
});

3.
doSomething().then(doSomethingElse());

4.
doSomething().then(doSomethingElse);




## 资源

[[翻译] We have a problem with promises - FEX](http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/)
[lie: promise兼容库](https://github.com/calvinmetcalf/lie)















