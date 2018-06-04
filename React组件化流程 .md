# 一、规范

https://github.com/loan-front-team/Code-Guide

# 二、技术栈：

```
es6 + less + react + react-route + webpack + node + ESlint + git + markdown + devTool +  hot-loader 
```

>[Git](https://github.com/loan-front-team/Code-Guide) 参考规范，注意命名和提交流程
>[百度脑图](http://naotu.baidu.com)
>[PxCook](http://www.fancynode.com.cn/pxcook)

# 三、开发流程

代码参考：
>[ant-design3.0](https://github.com/ant-design/ant-design)
>[ant-design1.11.2](https://github.com/ant-design/ant-design/releases/tag/1.11.2)


# 四、文件结构

style =》 component =》 Readme.md =》 思维导图 =》组件展示

>全局样式
>组件选择
>文档编写
>导图规范

# 五、组件封装原则

1、高复用性 + 少组件 + 大组件

高复用性：对项目中所有Web页面的结构有清晰的把握，能准确提取样式或功能雷同的模块并将其封装成组件
少组件：当深层次的成员无需组件化时，可直接将外层的父元素组件化以减少组件的数量，该原则是基于开发效率考虑的
大组件：应更多的将零散组件拼装成更大的组件，可以简化组件的调用，提升团队开发效率

2、容器组件 + 展示组件

容器组件：处理数据、逻辑（数据格式化）；对接后端API，格式改变则改变该组件
展示组件：处理样式；对接视觉设计及用户体验，这些组件不关注自己何时何处被渲染

3、应该最大限度的编写和使用Functional Components:无状态、无方法、纯组件


# 六、数据模型

共享数据（固定数据）：props对象（单向流动性|显示传递性|只读性） &&  store

私有数据（动态数据）：state对象

原则：
* 对数据切分时，props的优先级要高于state，尽可能保证组件的无状态化，简化组件的交互逻辑
* 如果在 render() 方法中没有被引用, 它不应该出现在 state 中
* this.props 由 React 本身设定, 而 this.state 具有特殊的含义，但如果需要存储一些不用于视觉输出的内容，则可以手动向类中添加额外的字段直接存在 this 中

# 七、事件系统

React合成事件：对原生HTML事件的封装，支持绝对部分HTML事件且跨浏览器支持
生命周期事件： 
其他平台事件：

# 八、JSX
 
条件判别：三段式 + IFEE

# 九、命名规则

导出的是函数则首字母小写，如createPicker


# UI组件

[Material](http://www.material-ui.com/#/components/app-bar)
[element](http://element.eleme.io/#/zh-CN)
[Ant Design](https://ant.design/docs/react/introduce-cn)

# 坑

1、component的名称，首字母必须大写。
2、挂在dom节点的属性要加data-这个都知道，但是属性中不要出现大写字母！类似这种data-imgSrc
3、如果将图片设置成dom节点背景，又恰巧碰上你获取服务器数据之前有份默认数据，偏偏又加了lazyload。那么请仔细看，你的图片是默认数据的还是服务器最新的？
4、react也不支持tab事件。如果你又恰巧用了kissy的话
5、忘掉if和else，只有三段式
6、在编写组件方法时，尤其是将方法作为props传递给子组件时，确保this的正确指向
7、setState采用异步的方式收集state的变化，统一处理，导致当前的state不可靠

# 编辑器

**Atom**
```bash
apm install editorconfig es6-javascript atom-ternjs javascript-snippets linter linter-eslint language-babel autocomplete-modules file-icons
```

**VSCode**
* [Editorconfig](https://github.com/editorconfig/editorconfig-vscode)
* [ESLint](https://github.com/Microsoft/vscode-eslint)
* [Flow](https://github.com/flowtype/flow-for-vscode)
* [Babel](https://github.com/dzannotti/vscode-babel)
* [Jest](https://github.com/orta/vscode-jest)
* [ES6 Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
* [React Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
:bulb: *If you are using the `flow-for-vscode` plugin, make sure to disable the `flowtype-errors/show-errors` eslint rule in the `.eslintrc` by setting it to `0`*

**Sublime**
* [Editorconfig Integration](https://github.com/sindresorhus/editorconfig-sublime#readme)
* [Linting](https://github.com/SublimeLinter/SublimeLinter3)
* [ESLint Integration](https://github.com/roadhump/SublimeLinter-eslint)
* [Syntax Highlighting](https://github.com/babel/babel-sublime)
* [Autocompletion](https://github.com/ternjs/tern_for_sublime)
* [Node Snippets](https://packagecontrol.io/packages/JavaScript%20%26%20NodeJS%20Snippets)
* [ES6 Snippets](https://packagecontrol.io/packages/ES6-Toolkit)

**Others**
* [Editorconfig](http://editorconfig.org/#download)
* [ESLint](http://eslint.org/docs/user-guide/integrations#editors)
* Babel Syntax Plugin
