## 问题

> 模拟实现call 、apply 和 bind

> 模拟实现instanceof

> 模拟实现new

> 模拟实现slice

> 实现防抖动函数

> 实现节流函数

> 模拟实现Promise.all

> Object.entries

## 解答

#### 模拟实现call | apply | bind

- 改变 this 的指向
- call 可以接收一个参数列表
- apply 只接受一个参数数组
- bind 返回一个函数，并可以实现柯里化
- 不传入第一个参数，那么默认为 window
- 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```javascript
Function.prototype.myCall = function(context) {
	var context = context || window
	// 给 context 添加一个属性
	context.fn = this
	// 将 context 后面的参数取出来
	var args = [...arguments].slice(1)
	var result = context.fn(...args)
	// 删除 fn
	delete context.fn
	return result
}
Function.prototype.myApply = function(context) {
	var context = context || window
	context.fn = this

	var result 
	// 需要判断是否存储第二个参数
	// 如果存在就将第二个参数展开
	if(arguments[1]) {
		result = context.fn(...arguments[1])
	} else {
		result = context.fn()
	}

	delete context.fn
	return result
}
Function.prototype.myBind = function(context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	var _this = this
	var args = [...arguments].slice(1)
	// 返回一个函数
	return function F() {
		// 因为返回了一个函数，我们可以 new F(),所以需要判断
		if (this instanceof F) {
			return new _this(...args, ..arguments)
		}
		return _this.apply(context, args.concat(...arguments))
	}
}
```

#### 模拟实现instanceof

- 通过判断对象的原型链中是不是能找到类型的prototype

```javascript
function myInstanceof(left, right) {
	// 获取类型的原型
	let prototype = right.prototype
	// 获取对象的原型
	left = left.__proto__
	while(true) {
		if (left === null) {
			return false
		}
		if (left === left ) {
			return true
		}
		left = left.__proto__
	}
}

```

#### 模拟实现new

- 新生成了一个对象
- 链接到原型
- 绑定this
- 返回新对象

```
function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数,shift()函数是将数组的第一个值删除，并返回
    let Con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}

```

#### 模拟实现slice

- 它接受两个参数(strat,[end]);从下标为start复制到下标为end

```
Array.prototype.slice = function(start,end){
      var result = new Array();
      start = start || 0;
      end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
      for(var i = start; i < end; i++){
           result.push(this[i]);
      }
      return result;
}
```

#### 实现防抖动函数

```
/**
 * debounce 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */

_.debounce = function(func, wait, immediate) {
	var timeout, args, context, timestamp, result
	var later = function () {
		// 现在和上一次时间戳比较
		var last = _.now() - timestamp
		// 如果当前间隔时间少于设定时间且大于0就重新设置定时器
		if (last > 0 && last < wait) {
			timeout = setTimeout(later, wait - last)
		}	else {
			// 否则的话就是时间到了执行回调函数
			timeout = null
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}
	return function () {
		context = this
		args = arguments
		// 获得时间戳
		timestamp = _.now()
		// 如果定时器不存在，那么立即执行函数
		var callNow = immediate && !timeout
		// 如果定时器不存在就创建一个
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			// 如果需要立即执行函数的话，通过apply执行
			result = func.apply(context, args)
			context = args = null
		}
		return result
	}
}

```
#### 实现节流

```
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

```

#### 模拟实现Promise.all

- 是 Promise 对象上的静态方法
- 参数：一个 promise 对象的数组 或 具有 Iterator 接口的对象
- 如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
- 当这个数组里的所有 promise 对象全部变为resolve或 有 reject 状态出现的时候，它才会去调用 .then 方法
- 它们是并发执行的
- 如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
- promise 数组中任何一个 promise 为 reject 的话，
则整个 Promise.all 调用会立即终止，
并返回一个 reject 的新的 promise 对象

```
// 测试代码
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});



var p1 = Promise.resolve(1),
    p2 = Promise.reject(2),
    p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
    //then方法不会被执行
    console.log(results);
}).catch(function (e){
    //catch方法将会被执行，输出结果为：2
    console.log(2);
});
```

```
function promiseAll (promises) {
	return new Promise((resolve, reject) => {
		if (!isArray(promises)) {
			throw new TypeError('参数必须是一个数组')
			return
		}
		var resolvedCounter = 0
		
	})

}
```


#### 模拟实现Object.entries

- 返回成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的[键、值]
- 返回一个数组

```
function myEntries(obj) {
	let arr = []
	for (let key of Object.keys(obj)) {
			arr.push(key, obj[key])
	}
	return arr
}

```





















