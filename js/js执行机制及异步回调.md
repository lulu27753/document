## JS 是单线程

H5中提出的webWorker是用单线程模拟出来的

## Event Loop

单线程导致任务阻塞：下一个任务的执行必须等上一个任务执行完毕，即使上一个任务会耗时很久很久

* 任务：任务进入执行栈
	* 同步任务：主线程 | 任务全部执行完毕 | 读取任务队列中的结果，进入主线程执行
	* 异步任务：Event Table 并注册回调函数 | 当指定的事情完成时将函数移入到Event Queue | 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行

主线程执行栈为空?
monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数

## setTimeout

setTimeout这个函数，是经过指定时间后，把要执行的任务加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远有可能大于指定时间。

## Promise 与 process.nextTick(callback)（相当于node.js版的”setTimeout”）

* 宏任务(): 包括整体代码script，setTimeout，setInterval
* 微任务(): Promise，process.nextTick


## JS的执行和运行

执行和运行有很大的区别
	* javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。
	* 运行大多指javascript解析引擎，是统一的

## 资源

[理解JavaScript 执行机制及异步回调（setTimeout/setInterval/Promise)](https://blog.csdn.net/haoaiqian/article/details/78622651?locationNum=8&fps=1)