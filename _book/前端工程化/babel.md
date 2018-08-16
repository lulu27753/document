## 前言

Babel配置和插件的开发维护：

* babel-preset-*

* babel-plugin-*

* babel-cli

* babel-node

* babel-core

* babel-runtime

* babel-plugin-transform-runtime

* babel-polyfill

* ...

## polyfill

babel编译只转换语法，但并不会转化BOM里不兼容的API，如Promise，Set，Symbol, Array.from, async, 就需要polyfill来解决

### babel-runtime

手动档

### babel-plugin-transform-runtime

自动档

主要做三件事情：
* 当你使用generators/async方法、函数时自动调用babel-runtime/regenerator
* 当你使用ES6 的Map或者内置的东西时自动调用babel-runtime/core-js
* 移除内联babel helpers并替换使用babel-runtime/helpers来替换

优点：
* 不会污染全局变量
* 多次使用只会打包一次
* 依赖统一按需引入,无重复引入,无多余引入

缺点：
* 不支持实例化的方法Array.includes(x) 就不能转化
* 如果使用的API用的次数不是很多，那么transform-runtime 引入polyfill的包会比不是transform-runtime 时大


### babel-polyfill






















## 参考资料
[loose模式](https://www.w3ctech.com/topic/1708)