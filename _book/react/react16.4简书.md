/文件/work/pa_project/jianshu

## React 思想

* 声明式开发
* 可以和其他的框架共存
* 组件式开发
* 单向数据流
* 视图层框架
* 函数式编程
	* 可以根据功能拆分函数
	* 唯一输入唯一输出导致测试会更加容易

## 虚拟DOM

### 原始方案
* state
* JSX模版
* 数据 + 模板 结合，生成真实的DOM来显示
* state发生改变
* 新的数据 + 模板 结合，生成真实的DOM来替换原始的DOM

缺陷：
第一次生成了一个完整的DOM片段，
第二次生成了一个完整的DOM片段，
第二次的DOM替换第一次的DOM，非常耗性能

### 比对方案

* state
* JSX模版
* 数据 + 模板 结合，生成真实的DOM来显示
* state发生改变

* 新的数据 + 模板 结合，生成真实的DOM,并不直接替换原始的DOM
* 新的DOM（DocumentFragment）和原始的DOM做比对，找差异
* 找出input框发生了变化
* 只用新的DOM中的input元素，替换掉老的DOM中的input元素

缺陷：虽然直接相较于用生成真实的DOM来替换原始的DOM节省了DON重绘的性能消耗，但是DOM的比对也会增加性能消耗，因此性能的提升并不明显

### React方案

* state
* JSX模版

* 生成虚拟DOM(虚拟DOM就是一个JS对象，用它来描述真实DOM)=》性能损耗，但极小
* 数据 + 模板 结合，生成真实的DOM来显示
* state发生变化
* 生成新的虚拟DOM
* 比较原始虚拟DOM和新的虚拟DOM的区别 =》diff算法
* 直接操作DOM，改变有区别的内容

优点：
1. 减少了真实DOM的创建及真实DOM的对比，用虚拟DOM取而代之
2. 使得跨端应用得以实现 =》 React Native

## diff算法

setState异步：本质上是为了提升React底层的性能

同层比对带来的优势是算法简单，比对速度会非常快

* 同级比较：先比对同级的节点，看是否一致，不一致则不再比较
* 添加key值，key值不要设为index，因为无法保持新的DOM和原始DOM上的key值一致(key值不稳定)

## ref

ref = {(node) => this.node = node}

直接操作DOM会触发各种问题，不太建议使用

## 生命周期函数

指在某一个时刻组件会自动调用执行的函数

* Initialization(初始化)
* Mounting(挂载)
* Updation(更新)：
	* componentWillReceiveProps
	* shouldComponentUpdate
	* componentWillUpdate
	* render
	* componentDidUpdate

* Unmounting(卸载)


## 数据mock

### Charles

[Charles官网](https://www.charlesproxy.com/)

Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4

### YAPI

[yapi: YApi 是一个可本地部署的、打通前后端及QA的、可视化的接口管理平台](https://github.com/ymfe/yapi)

## React 16

* 占位符
Fragment: 不会渲染成任何的标签或元素


## 动画

### CSS 动画

* transition
* animation
	* @keyframes
	* forwards: 可以让动画最后结束时保留最后的状态

### 第三方库

[react-transition-group](https://github.com/reactjs/react-transition-group)
[Ant Motion](https://motion.ant.design/)

## Redux

Redux = Reducer + Flux

yarn add redux

1. store的创建

* createStore()


2. reducer创建

* state，action
* 返回的是一个函数

3. 将reducer传入给store

4. chrome插件

```javascript
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

5. 组件store.dispatch(action)
6. store自动将新的状态和action转发给reducer
7. reducer处理完成后将新的数据返回给store
8. store更新数据
9. 组件订阅store的数据，当store更新时，重新渲染视图:store.subscribe(callbackFn)


* store是唯一的
* 只有store能改变改变自己的内容
* reducer必须是纯函数
	* 给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
* 核心API：
	* createStore
	* store.dispatch
	* store.getState
	* store.subscribe

## antd

```
yarn add antd
yarn add babel-plugin-import --dev
```

## UI 组件 及 容器组件

* UI 组件：负责渲染
* 容器组件：负责逻辑

## 无状态组件

只有一个render生命周期函数
性能比较高

## Redux 中间件

* redux-thunk
`yarn add redux-thunk`
配置：

```
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
```
* redux-saga

```bash
yarn add redux-saga

```

## react-redux

```bash
yarn add react-redux
```
- Provider: 连接store
- connect: 获取store里面的数据，替代store.getState()
- bindActionCreators: 隐式调用dispatch(action)


## styled-components

```bash
yarn add styled-components
```

[styled-components官网](https://www.styled-components.com/)

- injectGlobal：生成全局的样式
- styled

[Reset_CSS 官网](https://meyerweb.com/eric/tools/css/reset/)





























































