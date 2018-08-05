## 问题

* ES6 模块化如何使用，开发环境如何打包
* Class 和普通构造函数有何区别
* Promise的基本使用和原理
* ES6其他常用的功能

> 启动服务 http-server -p 8081

## ES6 模块化如何使用，开发环境如何打包

### 模块化的基本语法

```
export default 
export 

import 
```

### ES6语法编译

> 需要通过babel编译，安装核心插件

```bash
npm i --save-dev babel-core babel-preset-es2015 babel-preset-latest # 安装核心插件

npm i babel-cli -g # 安装命令行工具
babel --version # 查看版本信息

babel src/index.js  # 编译
```

> 创建.babelrc

```json
{
  "presets": ["es2015", "stage-0", "react", "latest"],
  "plugins": [
	  	"transform-runtime",
	  	["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
	  	["transform-decorators-legacy"]
  	]
}
```

### webpack模块化打包

> 功能强大

```bash
npm i webpack babel-loader --save-dev

```
- 配置webpack.config.js
- 配置package.json中的scripts

### Rollup

> 功能单一：打包模块化
> 没有冗余代码

```
npm i rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest babel-core --save-dev
```

- 配置.babelrc
- 配置rollup.config.js
- 参考设计原则和《Linux/Unix设计思想》
- 工具要尽量功能单一，可集成，可拓展
- wangEditor: gulp + rollup

> .babelrc

> 不关心引入的第三方库的语法

```
{
  "presets": ["es2015": {
  		"modules": false
  	}, "stage-0", "react", "latest"],
  "plugins": [
	  	"external-helpers"
  	]
}
```

> rollup.config.js

> UMD既兼容AMD又兼容CommonJS

```javascript
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
	entry: 'src/index.js',
	foramt: 'umd',
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**'
		})
	],
	dest: 'build/bundle.js'
}
```

> package.json

```"start": "rollup -c rollup.config.js"```

### 关于JS众多模块化标准

- 没有模块化
- AMD成为标准，require.js（也有CMD）
- 前端打包工具，使得nodejs模块化(CommonJS)可以被使用
- ES6 出现，统一所有的模块化标准。nodejs积极支持，浏览器尚未统一
- 对模块化标准统一的期待

## Class 和普通构造函数有何区别

- Class 在语法上更加贴合面向对象的写法
- Class 实现继承更加易读、易理解
- 更易于后端开发者的使用
- 本质上还是语法糖，使用prototype

## Promise的基本使用

### Callback hell 

### 语法

- new Promise实例，且要return
- new Promise时要传入函数，函数有resolve、reject两个参数
- 成功时执行resolve(),失败时执行reject()
- .then监听结果

## ES6 其他常用功能

- let/const
- 多行字符串|模版变量
- 解构赋值
- 块级作用域
- 函数默认参数
- 箭头函数













































