# Webpack 打包优化之体积篇

## 定位 webpack 大的原因

使用 [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) —— Webpack 插件和 CLI 实用程序，它可以将内容展示为方便交互的直观树状图，清晰的知道所构建包中真正引入的内容；从而看出项目大体有哪些模块组成，找到不合时宜的存在，然后优化它。默认会打开 http://127.0.0.1:8888。

## 引入 DllPlugin 和 DllReferencePlugin

DllPlugin 和 DllReferencePlugin 提供了以大幅度提高构建时间性能的方式拆分软件包的方法。其中原理是，将特定的第三方NPM包模块提前构建，然后通过页面引入。这不仅能够使得 vendor 文件可以大幅度减小，同时，也极大的提高了构件速度。

## 外部引入模块(CDN)

原则：

+ 确定引入的必要性
+ 避免类库引而不用
+ 尽量使用模块化引入
+ 尽可能引入更适合的包

> 如今前端开发，自然是使用`ES6`甚至更高版本，但由于浏览器兼容问题，仍得使用 `babel` 转换。而 `babel-polyfill` 也得引入以确保兼容；还比如项目开发中常用到的 `moment`, `lodash`等，都是挺大的存在，如果必须引入的话，即考虑外部引入之，再借助 `externals` 予以指定， `webpack`可以处理使之不参与打包，而依旧可以在代码中通过`CMD、AMD`或者`window/global`全局的方式访问。需要补充的是 `externals` 中：`key` 是 `require` 的包名，`value` 是全局的变量。

```javascript
// webpack 中予以指定
externals: {
  // 'vue': 'Vue',
  // 'lodash': '_',
  'babel-polyfill': 'window'
}

//
<script src="//cdn.bootcss.com/autotrack/2.4.1/autotrack.js"></script>
<script src="//cdn.bootcss.com/babel-polyfill/7.0.0-alpha.15/polyfill.min.js"></script>

```

## 按需异步加载模块

在保证尽可能合并请求及资源的情况下，如果js包过大，则需要异步加载，避免无端引入造成的浪费。

将一个组件(以及其所有的依赖)改为异步加载，只需将

```javascript
import Foo from './Foo.jsx'
```

改为如下写法：

```javascript
import Foo = () => import('./Foo.jsx')
```

> 如此分割，该组件所依赖的其他组件或其他模块，都会自动被分割进对应的 chunk 里，实现异步加载，当然也支持把组件按组分块，将同组中组件，打包在同个异步 chunk 中。

## 生产环境下压缩混淆并移除console

> 使用`UglifyJsPlugin` 插件并加入如下配置，

```javascript
new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: true,
    pure_funcs: ['console.log']
  },
  sourceMap: false
})
```

## 作用域提升(Scope Hoisting)

只需在配置文件中添加一个新的插件，就可以让 Webpack 打包出来的代码文件更小、运行的更快：

```javascript
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```
