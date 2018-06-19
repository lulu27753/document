* redux中间件：
	* 拦截action -> reducer 变为 action -> middlewares -> reducer 
	* 实现如异步 action ，action 过滤，日志输出，异常报告等功能
	* 常见的中间件
		* redux-logger：提供日志输出
		* redux-thunk：处理异步操作
		* redux-promise：处理异步操作，actionCreator的返回值是promise
* redux的缺点
	* 一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render,可能会有效率影响，或者需要写shouldComponentUpdate进行判断