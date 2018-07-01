## loader

loader是导出为一个函数的node模块，该函数在loader转换资源时调用，给定的函数将调用loader API，并通过this上下文访问
本质：接收字符串(或者buffer)，再返回处理完的字符串(或者buffer)的过程
## 设置

### 匹配单个 loader

webpack.config.js
```java
{
  test: /\.js$/
  use: [
    {
      loader: path.resolve('path/to/loader.js'), // 通过rule对象指向本地文件
      options: {/* ... */}
    }
  ]
}
```

### 匹配多个 loaders

webpack.config.js
```java
resolveLoader: {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'loaders') // 如果你的项目中有一个 /loaders 本地目录
  ]
}
```
### 为 loader 创建了独立的库和包

使用 [npm link](https://docs.npmjs.com/cli/link)，来将其关联到你要测试的项目
Npm link 专门用于开发和调试本地Npm模块，能做到在不发布模块的情况下，把本地的一个正在开发的模块的源码链接到项目的 node_modules 目录下，让项目可以直接使用本地的 Npm 模块。
由于是通过软链接的方式实现的，编辑了本地的 Npm 模块代码，在项目中也能使用到编辑后的代码。

完成 Npm link 的步骤如下：

* 确保正在开发的本地 Npm 模块（也就是正在开发的 Loader）的 package.json 已经正确配置好；
* 在本地 Npm 模块根目录下执行 npm link，把本地模块注册到全局；
* 在项目根目录下执行 npm link loader-name，把第2步注册到全局的本地 Npm 模块链接到项目的 node_moduels 下，其中的 loader-name 是指在第1步中的 package.json 文件中配置的模块名称。
* 链接好 Loader 到项目后你就可以像使用一个真正的 Npm 模块一样使用本地的 Loader 了

## 复杂用法

链式调用多个loader时，以相反顺序调用，从右往左或从上到下
* 最后的loader最早调用，将会传入原始资源内容
* 第一个loader最后调用，期望值是传出JS和SourceMap(可选)
* 中间的loader执行时，会传入前一个loader传出的结果

## 用法准则

* 简单：loaders 应该只做单一任务。这不仅使每个 loader 易维护，也可以在更多场景链式调用。
* 链式：loader 可以被链式调用意味着不一定要输出 JavaScript。只要下一个 loader 可以处理这个输出，这个 loader 就可以返回任意类型的模块。
* 模块化：保证输出模块化。loader 生成的模块与普通模块遵循相同的设计原则。
* 无状态：确保 loader 在不同模块转换之间不保存状态。每次运行都应该独立于其他编译模块以及相同模块之前的编译结果。
* loader工具库：
	* [loader-utils](https://github.com/webpack/loader-utils)
	* [schema-utils](https://github.com/webpack-contrib/schema-utils)
	* loader.js

	```javascript
		import { getOptions } from 'loader-utils';
		import validateOptions from 'schema-utils';
		const schema = {
		  type: 'object',
		  properties: {
		    test: {
		      type: 'string'
		    }
		  }
		}
		export default function(source) {
		  const options = getOptions(this);
		  validateOptions(schema, options, 'Example Loader');
		  // 对资源应用一些转换……
		  return `export default ${ JSON.stringify(source) }`;
		};
	```

	* loader 依赖: 必须使用 addDependency 方法显式声明

	```java
		import path from 'path';
		export default function(source) {
		  var callback = this.async();
		  var headerPath = path.resolve('header.js');
		  this.addDependency(headerPath);
		  fs.readFile(headerPath, 'utf-8', function(err, header) {
		    if(err) return callback(err);
		    callback(null, header + "\n" + source);
		  });
		};
	```

* 模块依赖
	* 通过把它们转化成 require 语句。
	* 使用 this.resolve 函数解析路径
* 通用代码
	* 在 loader 中创建一个运行时文件，并生成 require 语句以引用该共享模块
* 绝对路径
	* loader-utils 中的 stringifyRequest 方法，可以将绝对路径转化为相对路径。
* 同等依赖
	* package.json中指定peerDependency的值

## 处理二进制数据

在默认的情况下，Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串。
但有些场景下 Loader 不是处理文本文件，而是处理二进制文件，例如 file-loader，就需要 Webpack 给 Loader 传入二进制格式的数据。

```java
module.exports = function(source) {
    // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
    source instanceof Buffer === true;
    // Loader 返回的类型也可以是 Buffer 类型的
    // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
    return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据
// 最关键的代码是最后一行,没有该行 Loader 只能拿到字符串。 
module.exports.raw = true;
```

## 缓存加速

在有些情况下，有些转换操作需要大量计算非常耗时，如果每次构建都重新执行重复的转换操作，构建将会变得非常缓慢。
为此，Webpack 会默认缓存所有 Loader 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时，
是不会重新调用对应的 Loader 去执行转换操作的。

如果你想让 Webpack 不缓存该 Loader 的处理结果，可以这样：

```java
module.exports = function(source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};
```


## this.callback

this.callback 是 Webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。
this.callback 的详细使用方法如下：
```java
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```

## 其他Loader API

* `this.context`：当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src。
* `this.resource`：当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。
* `this.resourcePath`：当前处理文件的路径，例如 /src/main.js。
* `this.resourceQuery`：当前处理文件的 querystring。
* `this.target`：等于 Webpack 配置中的 Target
* `this.loadModule`：但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时，
就可以通过 this.loadModule(request: string, callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果。

* `this.resolve`：像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))。
* `this.addDependency`：给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)。
* `this.addContextDependency`：和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)。
* `this.clearDependencies`：清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()。
* `this.emitFile`：输出一个文件，使用方法为 emitFile(name: string, content: Buffer|string, sourceMap: {...})。
























## 资源

[编写一个 loader](https://webpack.docschina.org/contribute/writing-a-loader/)
[npm link](https://github.com/atian25/blog/issues/17)















