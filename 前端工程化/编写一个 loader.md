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

























## 资源

[编写一个 loader](https://webpack.docschina.org/contribute/writing-a-loader/)















