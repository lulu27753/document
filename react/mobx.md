## mobx

状态管理工具

## VS Redux

1. 开发难度低：redux函数式编程思想；mobx响应式编程风格，同时集成度高，避免引入众多第三方库
2. 开发代码量少：redux有reducer等众多概念，而mobx只要在store中更新即可
3. 渲染性能好：redux通过shouldComponentUpdate优化，但是当应用大到一定程度，就比较难实现；mobx精确的指出了哪些需要重复渲染，将re-render限制在最小范围之内

## mobx核心思想

1. 状态变化引起的副作用应该被自动触发
2. 数据流：类redux单向数据流模式（action =》 State =〉Reaction）

## 基础知识

```
mkdir mobx_test
cd mobx_test
mkdir src
touch src/index.js
npm init -y
touch webpack.config.js
yarn add webpack webpack-cli babel-core babel-preset-env babel-loader -D
```

配置webpack.config.js

```js
const path = require('path')

module.exports = {
	mode: 'development', // 'production'
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
				}
			}
		}]
	},
	devtool: 'inline-source-map', // 方便调试
}

```

配置package.json

```bash
"scripts": {
    "start": "webpack -w" // -w：js文件更改自动执行编译
  },
```

编写index.html
