## bind()

bind()会创建一个新函数(绑定函数)，新函数与被调函数(绑定函数的目标函数)具有相同的函数体(在ES5规范中内置的call属性)。当目标函数被调用时this值绑定到bind()的第一个参数，该参数不能被重写。绑定函数被调用时，bind()也接受预设的参数提供给原函数。一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略,同时调用时的参数被提供给模拟函数。

* bind后函数不会执行，而只是返回一个改变了上下文的函数副本，而call和apply是直接执行函数
* IE6～IE8不支持bind()

## 思路

* bind方法不会立即执行函数，需要返回一个待执行的函数(闭包，返回一个函数)
* 作用域绑定，使用apply或者call来实现`xx.call(yy) | xx.apply(yy)`
* 参数传递，由于参数的不确定性，需要用apply传递数组(实例更明了)`xx.apply(yy,[...Array])`,如果用call就不太方便了，因为call后面的参数要一个个列出来

## 类数组转数组

```javascript
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
// ES5
var arr1 = [].slice.call(arrayLike)
// ES6
let arr2 = Array.from(arrayLike)
```


## 实现

```java
if (!function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this
        var args = Array.prototype.slice.call(arguments)
        return function() {
            return self.apply(context, args.slice(1))
        }
    };
}
```

## 资源

[Javascript中bind()方法的使用与实现](http://www.cnblogs.com/chenpingzhao/p/4883995.html)
[javascript原生一步步实现bind分析](https://segmentfault.com/a/1190000007342882)
[类数组转数组方法详解](https://blog.csdn.net/u013084331/article/details/51210444)
[彻底理解js中this的指向，不必硬背](https://www.cnblogs.com/pssp/p/5216085.html)