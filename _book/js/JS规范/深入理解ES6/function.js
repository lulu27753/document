// 函数行参的默认值
// JS无论在函数定义中声明了多少个行参，都可以传入任意数量的参数，
// 也可以在定义函数时添加针对参数数量的处理逻辑，
// 当已定义的行参无对应的传入参数时为其指定一个默认值
// function makeRequest(url, timeout, callback) {
//   // ⚠️当timeout传入的值为0时，会使得timeout最终返回2000
//   timeout = timeout || 2000;
//   callback = callback || function () {}
// }
// // 更安全的选择时通过typeof检查参数类型
// function makeRequest(url, timeout, callback) {
//   timeout = (typeof timeout !== "undefined" ) ? timeout : 2000;
//   callback = (typeof callback !== "undefined") ? callback : function () {};
// }
// // ES6 中的默认参数值，如果没有参数传入值则为其提供一个初始值
// function makeRequest(url, timeout=2000, callback=function() {}) {
//   // 函数的其余部分
// }
// // ⚠️null是默认值的合法值

// // 无论当前是否为严格模式，默认参数值的存在使得auguments对象保持与命名参数分离
// function mixArgs(first, second='b') {
//   console.log(arguments.length) // 1
//   console.log(first === arguments[0]) //true
//   console.log(second === arguments[1]) // false
//   first = 'c'
//   second = 'd'
//   console.log(first === arguments[0]) // false
//   console.log(second === arguments[1]) // false
// }
// mixArgs(0)
// 默认参数表达式在函数调用时求值
// function getValue(value) {
//   return value + 5;
// }

// function add(first, second=getValue(first)) {
//   return first + second;
// }
// console.log(add(1, 1)) // 2 // 相当于执行了let first = 1; let second = 1;
// console.log(add(1)) // 7  // 相当于执行了let first = 1; let second = getValue(first);
// // 注意函数参数有自己的作用域和临时死区，其与函数体的作用域是各自独立的，也就是说参数的默认值不可访问函数体内声明的变量。

// // ES5中的无命名参数
// // 该函数返回一个给定对象的副本，包含该给定对象属性的特定子集
// // ⚠️并不容易发现该函数可以传入任意数量的参数
// function pick(object) {
//   let result = Object.create(null);
//   // ⚠️从第二个参数开始，因为第一个参数已经被“book”占用
//   for (let i = 1; i < arguments.length; i++) {
//     result[arguments[i]] = object[arguments[i]];
    
//   }
//   return result;
// }
// let book = {
//   title: 'es6',
//   name: 'lulu',
//   year: '2018'
// }
// let bookData = pick(book, 'author', 'year', 'name');
// console.log(bookData) // 抛出类型错误


// // ES6通过在函数的命名参数前添加三个点(...)来声明不定参数
// function pick(object, ...keys) {
//   let result = Object.create(null);
//   // arguments对象依然存在
//   console.log(arguments.length)
//   for (let i = 0; i < keys.length; i++) {
//     result[keys[i]] = object[keys[i]];
//   }
//   return result;
// }
// let book = {   title: 'es6',   name: 'lulu',   year: '2018' }
// let bookData = pick(book, 'year', 'name', 'author');
// console.log(bookData)

// // 展开运算符,返回的最小值为0
// let values = [-25, -50, -75, -100];
// console.log(Math.max(...values, 0)); 

// // 通过new调用函数时，执行的是construct函数，负责创建一个新的实例对象，然后再执行函数体，将this绑定到实例上；
// // 如果不通过new调用函数，则执行call函数，从而直接执行代码中的函数体。
// // 不是所有的函数都有construct方法，具有该方法的函数是构造函数
// function Person(name) {
//   if (this instanceof Person) {
//     this.name = name; // 如果通过new关键字调用的话，则执行
//   } else {
//     throw new Error('必须通过new关键字来调用Person')
//   }
  
// }
// var person = new Person('lulu')
// var notAPerson = Person('lulu')
// // 不依赖new关键字也可以将this绑定到Person的实例上
// // 因此对于函数本身是无法区分是否是通过new关键字调用得到的Person实例
// var notAPerson = Person.call(person, 'lulu')

// console.log(person)
// console.log(notAPerson) // 抛出错误对象

// // ES6元属性new.target:被赋值为new操作符的目标，即新创建
// // 元属性是指非对象的属性
// // ⚠️在函数外部使用new.target是一个语法错误
// function Person(name) {
//   console.log(new.target)
//   if (new.target === Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须通过new关键字来调用Person')
//   }
// }

// function AnotherPerson(name) {
//   Person.call(this, name)
// }

// var person = new Person('lulu');
// var anotherPerson = new AnotherPerson ('lulu');// 抛出错误

// 如果需要函数提升到代码块顶部，则选择块级函数；如果不需要，则选择let表达式

// // ES6会将块级函数提升至外围函数或全局作用域的顶部
// // 将块级函数标准化有助于提升声明函数的能力
// if (true) {
//   console.log(typeof doSomething); // function
//   function doSomething() {
//     // 空函数
//   }
//   doSomething();
// }
// console.log(typeof doSomething); // functions

// // 箭头函数中：没有this|super|arguments|new.target绑定（这些值由外围最近一层非箭头函数决定）
// // 因为没有construct方法，所以不能通过new关键字调用
// // 没有原型
// // 不可以改变this的绑定
// // 不支持arguments对象
// // 不支持重复的命名参数
// // ⚠️需要将字面量对象包裹在小括号里
// let getTempItem = id => ({id: id, name: 'Temp'});
// // 等同于
// let getTempItem = function(id) {
//   return {
//     id: id,
//     name: 'Temp'
//   }
// }

// // IIFE：定义一个匿名函数并立即调用，自始自终不保存对该函数的引用
// // 想创建一个与其他程序隔离的作用域时，这种模式很方便
// let person = function(name) {
//   return {
//     getName: function () {
//       return name;
//     }
//   }
// }('lulu');
// console.log(person.getName());

// let person = ((name) => {
//   return {
//     getName: function () {
//       return name;
//     }
//   }
// })('lulu')
// console.log(person.getName());

// // 处理页面上的交互，通过调用init()方法设置交互，依次分配事件处理程序来调用this.doSomething()
// let PageHandler = {
//   id: '123456',
//   init: function() {
//     document.addEventListener('click', function(event) {
//       this.doSomething(event.type).bind(this);
//     }, false);
//   },
//   doSomething: function(type) {
//     console.log('Handling' + type + 'for' + this.id);
//   }
// }

// // ES6箭头函数改写回调
// // 箭头函数中的this值取决于该函数外部非箭头函数的this值，且不能通过call()|apply()|bind()等方法来改变this的值
// let PageHandler = {
//   id: '123456',
//   init: function () {
//     document
//       .addEventListener('click', (event) => this.doSomething(event.type), false);
//   },
//   doSomething: function (type) {
//     console.log('Handling' + type + 'for' + this.id);
//   }
// }

// // 箭头函数没有自己的arguments对象，但未来无论函数在哪个上下文中执行，箭头函数始终可以访问外围函数的arguments对象
// function arrowReturnArg() {
//   return () => arguments[0];
// }
// var arrowFunction = arrowReturnArg(5);
// console.log(arrowFunction)

// 总结：包括回调函数在内所有使用匿名函数表达式的地方都适合用箭头函数来改写，
// 使用非箭头函数来处理由object.method()语法调用的方法。因为它们会接收到来自调用者的有意义的this值。
// 在其它场合都使用箭头函数。

// 尾调用：函数作为另一个函数的最后一条语句被调用
// ES5中尾调用实现：创建一个新的栈帧，将其推入调用栈来表示函数调用，即在循环调用中，每一个未用完的栈帧都会被保存在内存中，当调用栈变得过大时会造成程序问题。
// ES6中尾调用优化；如果满足(1)尾调用不访问当前栈帧的变量(即函数不是闭包)(2)在函数内部，尾调用是最后一条语句(3)尾调用的结果作为函数值返回，则尾调用不再创建新的栈帧，而是清除并重用当前栈帧
// 尾调用优化可以帮助函数保持一个更小的调用栈，从而减少内存的使用，避免栈溢出错误。当程序满足优化条件时，引擎会自动对其进行优化。
function doSomething() {
  return doSomethingElse();// 尾调用
}




