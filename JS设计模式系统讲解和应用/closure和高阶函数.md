## closure

看是否对自由变量进行了捕获

### 变量作用域

- 函数作用域
- 全局作用域

作用域链：变量的搜索从内而外。函数像一层半透明的玻璃，在函数里面可以看到函数外面的变量，而函数外面则无法看到函数里面的变量

### 变量的生命周期

- 全局变量：永久，除非主动销毁
- 局部变量：退出函数时就没有了价值，即随着函数调用的结束而被销毁

### 闭包的作用

- 封装变量
- 延续局部变量的寿命

```
// 然而闭包可以延续局部变量的生命周期
var func = function() {
	var a = 1;
	return function() {
		a++;
		alert(a)
	}
}
var f = func()
f() // 2
f() // 3
f() // 4
f() // 5
```
> 当退出函数时，局部变量a并没有消失，而是似乎一直在某个地方存活着。这是因为当执行`var f = func()`时，f返回了一个匿名函数的引用，它可以访问到func()被调用时产生的环境，而局部变量a一直处在这个环境里。既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。




```
var Type = {}

for (var i = 0; type = ['String', 'Array', 'Number']; i++) {
	(function(type){
		Type[`is${type}`] = function(obj) {
			return Object.prototype.toString.call(obj) === '[object ${type}]'
		}
	})(type)
}
Type.isArray([])
Type.isString('str')
```



```
// 对于相同的参数来说，每次都进行计算时一种浪费，引入缓存机制提高函数性能
var cache = {};
function mult() {
	var args = Array.prototype.join.call(arguments, ',')
	if (cache[args]) return cache[args]
	var result = 1
	for (var i = 0; i < arguments.length; i++) {
		result = result * arguments[i]
	}
	return cache[args] = result
}
console.log(mult(1, 2, 3))  // 6
console.log(mult(1, 2, 3))  // 6
console.log(cache)
```
代码重构：1. 去掉全局变量 2. 独立可复用的代码
```

var mult = (
	function(){
		var cache = {};
		return function () {
			var args = Array.prototype.join.call(arguments, ',')
			if (cache[args]) return cache[args]
			// return cache[args] = calculate.apply(null, arguments) // null 即 windows 对象
			 return cache[args] = calculate(...arguments)
		}
	}
)()

var calculate = function () {
	var result = 1
	for (var i = 0; i < arguments.length; i++) {
		result = result * arguments[i]
	}
	return result
}
console.log(mult(1, 2, 3))  // 6
console.log(mult(1, 2, 3))  // 6
```
```
var report = function (src) {
	var imgs = []
	return function(src){
		var img = new Image()
		imgs.push(img)
		img.src = src
	}
}
```

### 面向对象设计

> 过程与数据的结合是形容面向对象中的“对象”时经常使用的表达
对象以方法的形式包含了过程
而闭包则是在过程中以环境的形式包含了数据

```
// 闭包
var extent = function() {
	var value = 0
	return {
		call: function() {
			value++
			console.log(value)
		}
	}
}
var extent = extent()
extent.call()
extent.call()
```

```
// 面向对象
var extent = {
	value: 0,
	call: function() {
		this.value++
		console.log(this.value)
	}
}
extent.call() // 1
extent.call() // 2
extent.call() // 3
```

```
// 构造函数
var Extent = function() {
	this.value = 0
}
Extent.prototype.call = function() {
	this.value++
	console.log(this.value)
}
var extent = new Extent()
extent.call() // 1
extent.call() // 2
extent.call() // 3
```

### 用闭包实现命令模式

命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者(执行者)之间的耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者。
```
<body>
	<div>
		<button id="execute">点我执行命令</button>
		<button id="undo">点我执行命令</button>
	</div>
	<script type="text/javascript">
		var Tv = {
			open: function() {
				console.log('打开电视机')
			}
			close: function() {
				console.log('关上电视机')
			}
		}
		var OpenTvCommand = function(receiver) {
			this.receiver = receiver
		}
		OpenTvCommand.prototype.execute = function() {
			this.receiver.open() // 执行命令，打开电视机
		}
		OpenTvCommand.prototype.undo = function() {
			this.receiver.close() // 执行命令，关闭电视机
		}
		var setCommand = function(command) {
			document.getElementById('execute').onclick = function() {
				command.execute()
			}
			document.getElementById('undo').onclick = function() {
				command.undo()
			}
		}
		setCommand(new OpenTvCommand(Tv))
	</script>
</body>
```

```
<script type="text/javascript">
		var Tv = {
			open: function() {
				console.log('打开电视机')
			}
			close: function() {
				console.log('关上电视机')
			}
		}
		var createCommand = function(receiver) {
			var execute = function() {
				return receiver.open() // 执行命令，打开电视机
			}
			var undo = function() {
				return receiver.close() // 执行命令，关闭电视机
			}
			return {
				execute: execute,
				undo: undo
			}
		}
		var setCommand = function(command) {
			document.getElementById('execute').onclick = function() {
				command.execute()
			}
			document.getElementById('undo').onclick = function() {
				command.undo()
			}
		}
		setCommand(createCommand(Tv))
	</script>
```

### 闭包与内存管理

局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封闭在闭包形成的环境中，那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法被及时销毁。使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，因为可能在以后还需要使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的。如果在将来需要回收这些变量，可以手动把这些变量设为null

使用闭包的同时比较容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，就有可能造成内存泄露。在IE浏览器中，由于 BOM 和 DOM 中的对象是使用 C++ 以 COM 对象的方式实现的，而 COM 对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收。

## 高阶函数


- 函数可以作为参数被传递
- 函数可以作为返回值输出


### 作为参数被传递

分离业务代码中变化和不变的部分

1. 回调函数
- 异步请求
- 当一个函数不适合执行一些请求时，可以把这些请求封装成一个函数，“委托”给另外一个函数来执行     


### 作为返回值输出

```
var getSingle = function(fn) {
	var ret
	return function() {
		return ret || (ret = fn.apply(this, arguments))
	}
}
var getScript = getSingle(function() {
	return document.createElement('script')
})
var script1 = getScript()
var script2 = getScript()
alert(script1 === script2) // true
```

### 高阶函数实现AOP

AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。
```
Function.prototype.before = function(beforefn) {
	var _self = this // 保存原函数的引用
	return function() { // 返回包含了原函数和新函数的“代理”函数
		beforefn.apply(this, arguments) // 执行新函数，修正this
		return _self.apply(this, arguments) // 执行原函数
	}
}
Function.prototype.after = function(afterfn) {
	var _self = this
	return function() {
		var ret = _self.apply(this, arguments)
		afterfn.apply(this, arguments)
		return ret
	}
}
var func = function() {
	console.log(2)
}
func = func.before(function() {
	console.log(1)
}).after(function() {
	console.log(3)
})
```












