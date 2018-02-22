// // ES5近类结构：首先创建一个构造函数，然后定义另一个方法赋值给构造函数的原型
//  function PersonType(name) {
//    this.name = name;
//  }
//  PersonType.prototype.sayName = function() {
//    console.log(this.name);
//  }
//  var person = new PersonType('lulu');
//  person.sayName();
//  console.log(person instanceof PersonType);// true
//  console.log(person instanceof Object);// true

// // 类声明
// class PersonClass {
//   // 等价于PersonType构造函数
//   constructor(name) {
//     // 自有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建
//     // 建议只在构造函数中创建所有自有属性，从而只通过一处就可以控制类中的所有自有属性
//     this.name = name;
//   }
//   // 等价于PersonType.prototype.sayName
//   // ⚠️类属性不可被赋予新值，是只读属性
//   sayName() {
//     console.log(this.name);
//   }
// }
// let person = new PersonClass('lulu')
// person.sayName()// lulu

// console.log(person instanceof PersonClass);// true
// console.log(person instanceof Object);// true

// console.log(typeof PersonClass);// function
// console.log(typeof PersonClass.prototype.sayName);// function


// 类和自定义类型之间的差异：
// 1.函数声明可以被提升，而类声明与let声明类似，不能被提升；真正执行声明语句之前，它们会一直存在于临时死区中
// 2.类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行
// 3.在自定义类型中，需要通过Object.defineProperty()手工指定某个方法不可枚举；而在类中，所有方法都是不可枚举的。
// 4.每个类内部都有一个[[Construct]]的内部方法，通过关键字new调用不含[[Construct]]的方法会导致程序抛出错误
// 5.使用除关键字new以外的方式调用类的构造函数会导致程序抛出错误
// 6.在类中修改类名会导致程序报错

// // 等价于PersonClass
// let PersonType2 = (function() {
//   'use strict';
//   const PersonType2 = function(name) {
//     // 确保通过关键字new调用该函数
//     if (typeof new.target === 'undefined') {
//       throw new Error('必须通过关键字new调用构造函数！')
//     }
//     this.name = name;
//   };

//   Object.defineProperty(PersonType2.prototype, 'sayName', {
//     value: function() {
//       // 确保不会通过关键字new调用该方法
//       if (typeof new.target !== 'undefined') {
//         throw new Error('不可使用关键字new调用该方法')
//       }
//       console.log(this.name);
//     },
//     enumerable: false,
//     writable: true,
//     configurable: true
//   });

//   return PersonType2;
// }());

// // 一等公民：一个可以传入函数，可以从函数返回，并且可以赋值给变量的值
// // 将类作为参数传入函数中
// function createObject(classDef) {
//   return new classDef();
// }
// let obj = createObject(class{
//   sayHi(){
//     console.log('Hi!');
//   }
// });
// obj.sayHi(); // 'Hi!'

// // 通过立即调用类构造函数可以创建单例
// // 用new调用类表达式，紧接着通过一对小括号调用这个表达式
// let person = new Class {
//   constructor(name) {
//     this.name = name
//   }
//   sayName() {
//     console.log(this.name);
//   }
// }('lulu');
// person.sayName();

// // 类支持直接在原型上定义访问器属性(getter|setter)
// // 针对现有DOM元素的包装器，将元素的innerHTML方法委托给html属性
// class CustomHTMLElement {
//   constructor(element) {
//     this.element = element;
//   }
//   get html() {
//     return this.element.innerHTML;
//   }
//   set html(value) {
//     this.element.innerHTML = value;
//   }
// }
// var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, 'html');
// console.log(descriptor);

// console.log('get' in descriptor);
// console.log('set' in descriptor);
// console.log(descriptor.enumerable);

// // 用方括号包裹一个表达式即可使用可计算名称
// let methodName = 'sayName'
// class PersonClass {
//   constructor(name) {
//     this.name = name;
//   }

//   [methodName](){
//     console.log(this.name);
//   }
// };
// let me = new PersonClass('lulu')
// me.sayName();

// // 在类中，可以将任何方法定义成生成器
// class MyClass {
//   *createIterator() {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// }
// let instance = new MyClass()
// let iterator = instance.createIterator()

// // 通过Symbol.iterator定义生成器方法来为类定义默认迭代器
// class Collection {
//   constructor() {
//     this.items = [];
//   }
//   *[Symbol.iterator]() {
//   // ⚠️values()方法暂时不支持，需要配置一下 babel-polyfill
//     yield * this.items.values();
//   }
// }
// var collection = new Collection()
// collection.items.push(1)
// collection.items.push(2)
// collection.items.push(3)

// for (let x of collection) {
//   console.log(x); 
// }

// // 静态成员
// // ES5:直接将方法添加到构造函数中来模拟静态成员
// function PersonType(name) {
//   this.name = name;
// }
// // 静态方法
// PersonType.create = function(name) {
//   return new PersonType(name);
// }
// // 实例方法
// PersonType.prototype.sayName = function() {
//   console.log(this.name);
// }
// var person = PersonType.create('lulu')

// // ES6:在方法或访问器属性名前使用正式的静态注释即可
// // 等价于
// class PersonClass {
//   // 等价于PersonType构造函数
//   constructor(name) {
//     this.name = name;
//   }
//   // 等价于PersonType.prototype.sayName
//   sayName() {
//     console.log(this.name);
//   }
//   // 等价于PersonType.create
//   static create(name) {
//     return new PersonClass(name);
//   }
// }
// let person = PersonClass.create('lulu')

// // ES5实现继承：用一个创建自Rectangle.prototype的新对象重写Square.prototype并调用Rectangle.call()
// function Rectangle(length, width) {
//   this.length = length;
//   this.width = width;
// }
// Rectangle.prototype.getArea = function() {
//   return this.length * this.width;
// }
// function Square(length) {
//   Rectangle.call(this, length, length)
// }
// Square.prototype = Object.create(Rectangle.prototype, {
//   constructor: {
//     value: Square,
//     emumerable: true,
//     writable: true,
//     configurable: true
//   }
// });
// var square = new Square(3)
// console.log(square.getArea());// 9
// console.log(square instanceof Square);// true
// console.log(square instanceof Rectangle);// true

// // ES6:通过调用super()即可访问基类的构造函数;通过extends关键字继承Rectangle类
// class Rectangle {
//   constructor(length, width) {
//     this.length = length;
//     this.width = width;
//   }
//   getArea() {
//     return this.length * this.width;
//   }
// }
// 派生类：继承自其他类的类，如果在派生类中指定了构造函数则必须调用super()
// 如果派生类不使用构造函数，则当创建新的类实例时会自动调用super()并传入所有参数
// class Square extends Rectangle {
//   constructor(length) {
//     // 等价于Rectangle.call(this, length, length)
//     super(length, length);
//   }
// }
// var square = new Square(3)
// console.log(square.getArea());// 9
// console.log(square instanceof Square);// true
// console.log(square instanceof Rectangle);// true


// super小贴士：
// 1.只可在派生类的构造函数中使用super(),如果尝试在非派生类(没有用extends声明的类)或函数中使用则会导致程序抛出错误
// 2.在构造函数中访问this之前一定要调用super(),它负责初始化this,如果在调用super()之前尝试访问this会导致程序出错
// 3.如果不想调用super(),则唯一的方法是让类的构造函数返回一个对象

// // 派生类中的方法总会覆盖基类中的同名方法
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length);
//   }
//   // 覆盖并遮蔽Rectangle.prototype.getArea()
//   getArea() {
//     return this.length * this.length
//     // 如果想调用基类中的该方法，可以通过super来调用
//     // return super.getArea()
//   }
  
// }

// // ES6可以从表达式导出类
// // Rectangle是ES5的构造函数，但因其具有[[construct]]属性和原型，因此Square类可以直接继承它
// function Rectangle(length, width) {
//   this.length = length;
//   this.width = width;
// }
// Rectangle.prototype.getArea = function () {
//   return this.length * this.width;
// }
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length);
//   }
// }
// var x = new Square(3)
// console.log(x.getArea());

// // extends使得类可以继承自任意类型的表达式，从而可以动态确定使用哪个基类
// function Rectangle(length, width) {
//   this.length = length;
//   this.width = width;
// }
// Rectangle.prototype.getArea = function () {
//   return this.length * this.width;
// }
// function getBase() {
//   return Rectangle;
// }
// class Square extends getBase() {
//   constructor(length) {
//     super(length, length);
//   }
// }
// var x = new Square(3) // 9
// console.log(x.getArea());// true

// 创建mixin
let SerializableMixin = {
  serialize() {
    return JSON.stringify(this);
  }
}
let AreaMixin = {
  getArea() {
    return this.length * this.width;
  }
}
// 可以接受任意数量的mixin对象作为参数
// 如果多个mixin对象具有相同属性，那么只有最后一个被添加的属性被保留
function mixin(...mixins) {
  var base = function () {}
  // 将每个mixin对象的属性值赋值给base的原型，从而实现原型继承
  Object.assign(base.prototype, ...mixins);
  return base;
}
class Square extends mixin(AreaMixin, SerializableMixin) {
  constructor(length) {
    super();
    this.length = length;
    this.width = length;
  }
}

var x = new Square(3);// 9
console.log(x.getArea());// true










