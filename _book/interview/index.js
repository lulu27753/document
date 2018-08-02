// 1.
var bar = null;
console.log('1.');
console.log(typeof bar === "object"); // true
console.log((bar !== null) && (typeof bar === "object")); // false
console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function"))) // false
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]")); // false

// 2.
(function () {
  // b = 3
  // var a = b
  // b变成了全局变量
  var a = b = 3;
})();
console.log('2.');
console.log("a defined? " + (typeof a !== 'undefined')); // a defined? false
console.log("b defined? " + (typeof b !== 'undefined')); // b defined? true

// 3.
var myObject = {
  foo: "bar",
  func: function () {
    var self = this;
    console.log('3.');
    console.log("outer func:  this.foo = " + this.foo); // outer func:  this.foo = bar
    console.log("outer func:  self.foo = " + self.foo); // outer func:  self.foo = bar
    (function () {
      console.log("inner func:  this.foo = " + this.foo); // this.foo = undefined ES5之前this === window
      console.log("inner func:  self.foo = " + self.foo); // self.foo = bar
    }());
  }
};
myObject.func();

// 4.分号在JavaScript中是一个可选项（尽管省略它们通常是非常糟糕的形式）。
// 其结果就是，当碰到 foo2()中包含 return语句的代码行（代码行上没有其他任何代码），分号会立即自动插入到返回语句之后。
// 也不会抛出错误，因为代码的其余部分是完全有效的，即使它没有得到调用或做任何事情（
// 相当于它就是是一个未使用的代码块，定义了等同于字符串 "hello"的属性 bar）
function foo1()
{
  return {
    bar: "hello"
  };
}
function foo2()
{
  return
  {
    bar: "hello"
  };
}
console.log('4.');
console.log("foo1 returns:", foo1()); // foo1 returns: { bar: 'hello' }
console.log("foo2 returns:", foo2()); // foo2 returns: undefined

// 5.
// NaN的类型是Number
// NaN和任何东西(包括它自己)比较，都是false
// 检测NaN
// (1) isNaN(value)
// (2) value !== value
// (3) Number.isNaN(value)
console.log('5.');
console.log(typeof NaN === "number", NaN === NaN);

// 6.JS中的数字和浮点精度的处理相同，因此，可能不会总是产生预期的结果
console.log('6.');
console.log(0.1 + 0.2, 0.1 + 0.2 == 0.3); // 0.30000000000000004 false

// 7.实现一个函数用于确定X是否是整数
// ES6: Number.isInteger()
function isInteger(num) {
  return Math.round(x) === x // Math.ceil() || Math.floor()
}
// 8.实现一个函数用于确定字符串是否为回文结构
function isPalindrome(str) {
  str = str.replace(/W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
// 9.
// for (var i = 0; i < 5; i++) {
//   var btn = document.createElement('button');
//   btn.appendChild(document.createTextNode('Button ' + i));
//   btn.addEventListener('click', function () {
//     console.log(i); // 输出的都是5，当 onclick 方法被调用（对于任何按钮）的时候， for 循环已经结束，变量 i 已经获得了5的值
//   });
//   document.body.appendChild(btn);
// }
// for (var i = 0; i < 5; i++) {
//   var btn = document.createElement('button');
//   btn.appendChild(document.createTextNode('Button ' + i));
//   (function (i) {
//     btn.addEventListener('click', function () {
//       console.log(i);
//     });
//   })(i);
//   document.body.appendChild(btn);
// }
// 10.arr2 仅仅是一个到 arr1的引用（而不是副本）
var arr1 = "john".split(''); 
var arr2 = arr1.reverse(); // ['n','h','o','j']
var arr3 = "jones".split(''); // ['j', 'o', 'n', 'e', 's']
arr2.push(arr3); // ['n','h','o','j', ['j', 'o', 'n', 'e', 's']]
console.log('10.')
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1)); // 5,['j', 'o', 'n', 'e', 's']
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1)); // 5,['j', 'o', 'n', 'e', 's']

// 11.
console.log(1 + "2" + "2"); // '122'
console.log(1 + +"2" + "2"); // ‘32’
console.log(1 + -"1" + "2"); // ‘02’
console.log(+"1" + "1" + "2"); // ‘112’
console.log("A" - "B" + "2"); // 'NaN2'
console.log("A" - "B" + 2); // 'NaN'

// 12.
console.log('12.', (function f(n) {
  return ((n > 1) ? n * f(n - 1) : n)
})(10)); // 3628800 10!

// 13.由于 x未在函数内部中定义，因此在外部函数范围中搜索定义的变量 x，且被发现具有1的值
// 闭包是一个函数，连同在闭包创建的时候，其范围内的所有变量或函数一起
(function (x) {
  return (function (y) {
    console.log(x);// 1
  })(2)
})(1);

// 14.
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name;
  }
};
var stoleSecretIdentity = hero.getSecretIdentity;
// var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
console.log(stoleSecretIdentity()); // undefined
console.log(hero.getSecretIdentity()); // John Doe

// 15.


