// // 对象字面量：键值对集合
// // ES6属性初始化简写：属性名称与函数参数相同时，不必再写冒号和值，只写属性名即可
// // ES6对象方法简写：不必写冒号和function关键字
// var person = {
//   name: 'lulu',
//   sayName() {
//     console.log(this.name)
//   }
// }
// person.sayName();

// // 可计算属性名
// // 引用的两个属性名中都含有空格，因而不可使用点记法引用这些属性
// // 方括号支持通过任何字符串值作为名称访问属性的值
// var person = {},
//   lastName = 'last name';
// person['first name'] = 'lu';
// person[lastName] = 'liuliu';

// console.log(person['first name'])
// console.log(person[lastName])

// // ES6可在对象字面量中使用可计算属性名称
// // 在对象字面量中使用方括号表示的该属性名是可计算的（可使用表达式），它的内容将被求值并转化为一个字符串
// let suffix = ' name';
// let person = {
//   ['first' + suffix] : 'lu',
//   ['last' + suffix] : 'liu'
// };

// console.log(person['first name'])
// console.log(person['last name'])

// // 全局对象新增方法
// // Object.is():参数类型相同且具有相同的值，则返回true
// // +0 和 -0 在JS引擎中被表示为两个完全不同的实体
// console.log(+0 == -0) // true
// console.log(+0 === -0) // true
// console.log(Object.is(+0, -0));// false

// console.log(NaN == NaN) // false
// console.log(NaN === NaN) // false
// console.log(Object.is(NaN, NaN)) // true

// console.log(5 == 5) // true
// console.log(5 == "5") // true
// console.log(5 === 5) // true
// console.log(5 === "5") // false
// console.log(Object.is(5, 5)) // true
// console.log(Object.is(5, '5'))// false

// mixin():一个对象接收来自另一个对象的属性和方法，而不需要通过继承
// 遍历supplier的自有属性并复制到receiver中
// 浅复制：当属性值为对象时只复制对象的引用
// function mixin(receiver, supplier) {
//   Object.keys(supplier).forEach(function(key) {
//     receiver[key] = supplier[key];
//   })
//   return receiver;
// }

// // Object.assign():接受一个接收对象和任意数量的源对象，最终返回接收对象
// // myObject接收EventTarget.prototype对象的所有行为，从而使myObject可以分别通过emit()发布事件或通过on()订阅事件
// function EventTarget() {}
// EventTarget.prototype = {
//   constructor: EventTarget,
//   emit: function() {},
//   on: function() {}
// };
// var myObject = {};
// mixin(myObject, EventTarget.prototype);
// Object.assign(myObject, EventTarget.prototype);

// myObject.emit("somethingChanged");

// // 按顺序复制到接收对象中，所以如果多个源对象具有同名属性，则排位靠后的源对象会覆盖排位靠前的
// var receiver = {};
// Object.assign(receiver,
//   {
//     type: 'js',
//     name: 'file.js'
//   },
//   {
//     type: 'css'
//   }
// );
// console.log(receiver.type)// css
// console.log(receiver.name)// file.js


// // Object.assign()不能将提供者的访问器属性复制到接收对象中。
// // 因为其执行了赋值操作，因此提供者的访问器最终会转变为接收对象中的一个数据属性
// var receiver = {};
// var supplier = {
//   get name() {
//     return 'file.js'
//   }
// }
// Object.assign(receiver, supplier);
// var receiverDescriptor = Object.getOwnPropertyDescriptor(receiver, 'name');
// var supplierDescriptor = Object.getOwnPropertyDescriptor(supplier, 'name');
// console.log(receiverDescriptor.value);// file.js
// console.log(supplierDescriptor.value);// undefined
// console.log(receiverDescriptor.get);// undefined
// console.log(supplierDescriptor.get);// function get name(){}

// // ES6代码不再检查重复属性，对于每一组重复属性，都会选取最后一个取值
// var person = {
//   name: 'lulu',
//   name: 'liuliu'
// };
// console.log(person.name);

// // 自有属性枚举顺序的基本规则：
// // 1.所有数字键按升序排序
// // 2.所有字符串键按照它们被加入对象的顺序排序
// // 3.所有symbol键按照它们被加入对象的顺序排序
// // ⚠️for-in和Object.keys()和JSON.stringfy()都使用相同的枚举顺序
// var obj = {
//   a: 1,
//   0: 1,
//   c: 1,
//   2: 1,
//   b: 1,
//   1: 1
// };
// obe.d = 1;
// console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"

// // 无论是通过构造函数还是Object.create()创建对象，其原型实在对象被创建时指定的。
// // 对象原型在实例化后保持不变
// // Object.getPrototypeOf()返回任意指定对象的原型
// // Object.setPrototypeOf()改变任意指定对象的原型
// let person = {
//   getGreeting() {
//     return 'Hello';
//   }
// };
// let dog = {
//   getGreeting() {
//     return 'Woof'
//   }
// };
// let friend = Object.create(person);
// console.log(friend.getGreeting());
// console.log(Object.getPrototypeOf(friend) === person);

// Object.setPrototypeOf(friend, dog);
// console.log(friend.getGreeting());
// console.log(Object.getPrototypeOf(friend) === dog);

// // ES5调用同名原型方法
// // ES6用super调用同名原型方法
// //⚠️super只能用在简写方法的对象中
// let person = {
//   getGreeting() {
//     return 'Hello';
//   }
// };
// let dog = {
//   getGreeting() {
//     return 'Woof'
//   }
// };
// let friend = {
//   getGreeting() {
//     // return Object.getPrototypeOf(this).getGreeting.call(this) + ",Hi";
//     return super.getGreeting() + ",Hi";
//   }
// };
// Object.setPrototypeOf(friend, person);
// console.log(friend.getGreeting());
// console.log(Object.getPrototypeOf(friend) === person);
// Object.setPrototypeOf(friend, dog);
// console.log(friend.getGreeting());
// console.log(Object.getPrototypeOf(friend) === dog);

// let person = {
//   getGreeting() {
//     return 'Hello';
//   }
// };
// let friend = {
//   getGreeting() {
//     // return Object.getPrototypeOf(this).getGreeting.call(this) + ",Hi";
//     // super引用不是动态变化的，总是指向正确的对象，在这里始终指向person
//     return super.getGreeting() + ",Hi";
//   }
// };
// Object.setPrototypeOf(friend, person);

// let relative = Object.create(friend);// 多重继承，会导致递归调用从而触发堆栈溢出
// console.log(person.getGreeting())// Hello
// console.log(friend.getGreeting())// Hello,Hi
// console.log(relative.getGreeting())// 范围错误：堆栈溢出


// super的所有引用都通过[[HomeObject]]属性来确定后续的运行过程。
// 1.在[[HomeObject]]上调用Object.getPrototypeOf()来检索原型的引用
// 2.搜寻原型找到同名函数
// 3.设置this绑定并调用响应的方法

