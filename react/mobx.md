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

### 实现继承和多态

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
```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<script src= "src/index.js" type="text/javascript"></script>
</body>
</html>
```

编写src/index.js 用原生实现继承和多态
1. 继承：Dog.prototype.__proto__ === Animal.prototype
2. 多态：重写Dog的name属性
3. Dog的原型对象的构造函数应该指向Dog而不是Animal

```java
function Animal() {
	// body...
}
function Dog() {
	// body...
}
Object.defineProperties(Animal.prototype, {
	name: {
		value() {
			return 'Animal'
		}
	},
	say: {
		value() {
			return `I'm ${this.name()}`
		}
	}
})
// dog instanceOf Animal === true
// dog.__proto__.__proto__ === Animal.prototype
// dog.__proto__ === Dog.prototype
// Dog.prototype.__proto__ === Animal.prototype
Dog.prototype = Object.create(Animal.prototype, {
	constructor: {
		value: Dog,
		enumerable: false,
	},
	name: {
		value() {
			return `Dog`
		}
	}
})

// document.write(new Dog() instanceOf Animal())
// document.write(new Dog().say())
document.write(Dog.prototype.constructor)
```
 通过ES6来实现

```java
class Animal {
	name() {
		return 'Animal'
	}
	say() {
		return `I'm ${this.name()}`
	}
}

class Dog extends Animal {
	name() {
		return 'Dog'
	}
}

console.log(new Dog() instanceOf Animal
```

安装babel插件，使其支持在类中声明成员变量
`yarn add babel-plugin-transform-class-properties -D`
配置webpack.config.js
module.rules下面的use.plugins: ['transform-class-properties']

### decorator

Decorator是在`声明阶段`实现类与类成员注解的一种语法.本质上是特殊的函数。

安装babel插件
`yarn add babel-plugin-transform-decorators-legacy -D`
配置webpack.config.js
module.rules下面的use.plugins: ['transform-decorators-legacy']

## mobx 常用 API

安装mobx依赖：`yarn add mobx`

### observable(可观察的数据)

是一种让数据的变化可以被观察的方法

哪些数据可以被观察：
* 原始类型：String | Number | Boolean | Symbol
* 对象
* 数组

PS：一定要检查数组的长度以避免越界访问，在mobx中越界的数组值是不被观察的.同样要检查对象是否含有属性hasOwnProperty

```java
import { observable } from 'mobx';

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

  @observable string = 'hello'
  @observable number = 20
  @observable bool = false
}
```

### 对可观察的数据作出反应

方式：
* computed
	* observe()
	* get()
* autorun
* when
* reaction


## mobx实现todoList

yarn add mobx-react react react-dom prop-types
yarn add babel-preset-react

配置webpack.config.js
`presets: [['env', 'react']],`





## 资源

mobx-state-tree
































