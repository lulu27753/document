//1.属性简写
//ES(6)
const foo = 'bar';
const baz = {foo};
console.log(baz);

// 等同于(ES5)
const baz2 = {foo2: foo};
console.log(baz2);


function f1(x, y) {
  return {x: x, y: y};
}
//等同于
function f2(x, y) {
  return {x, y};
}

console.log(f1(1, 2)); 
console.log(f2(1, 2)); 


//2.属性名表达式
// 方法一
var obj = {};
obj.foo = true;
// 方法二
obj['a' + 'bc'] = 123;
console.log(obj.foo);
console.log(obj.abc);

//使用字面量定义对象,ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
}
console.log(obj.foo);
console.log(obj.abc);

//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';
let obj2 = {
  [propKey]: 'true6',
  ['a' + 'bc']: 1236
}
console.log(obj2.foo);
console.log(obj2.abc);

// 报错
// const foo3 = 'bar';
// const bar3 = 'abc';
// const baz3 = { [foo3] };

// 正确
const foo4 = 'bar';
const baz4 = { [foo4]: 'abc'};

//3.方法的name属性
const person = {
  sayName() {
    console.log('hello!');
  },
};

console.log(person.sayName.name);

const obj3 = {
  get foo() {},
  set foo(x) {}
};

//console.log(obj3.foo.name); //报错。Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj3, 'foo');
console.log(descriptor.get.name); 
console.log(descriptor.set.name); 

//4.Object.is
console.log('4-1:'+ ('2' == 2)); //自动会进行类型转换
console.log('4-1:'+ ('2' === 2));
console.log('4-1:'+ Object.is('2', 2));

console.log('4-2:'+({} == {}));
console.log('4-2:'+ ({} === {}));
console.log('4-2:'+ Object.is({}, {}));

console.log('4-3:'+(+0 == -0));
console.log('4-3:'+ (+0 === -0));
console.log('4-3:'+ Object.is(+0, -0));

console.log('4-4:'+(NaN == NaN));
console.log('4-4:'+ (NaN === NaN));
console.log('4-4:'+ Object.is(NaN, NaN));


//5.object.assign
const target = { a: 1 };
const source1 = { b: 2 ,c:2};
const source2 = { c: 3 ,d:4};

Object.assign(target, source1, source2);
console.log(target);


console.log('5-2:'+typeof Object.assign(2));
// console.log(typeof Object.assign(null)); //null和undefined无法转为对象
// console.log(typeof Object.assign(undefined));

const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj4 = Object.assign({}, v1, v2, v3);
console.log('5-3:'+obj4); 

const target5 = { a: { b: 'c', d: 'e' } }
const source5 = { a: { b: 'hello' } }
Object.assign(target5, source5);
console.log('5-4:'+target5); 

//数组的处理
var arr1 = [1, 2, 3];
var arr2 = [4, 5];
Object.assign(arr1, arr2);
console.log(arr1);


let obj7 = { foo: 123 };
console.log(Object.getOwnPropertyDescriptor(obj7, 'foo'));

Reflect.ownKeys({[Symbol()]:0, b:0, 10:0, 2:0, a:0 })


//6.Object.setPrototypeOf(),Object.getPrototypeOf()
let proto = {};
let obj8 = { x: 10 };
Object.setPrototypeOf(obj8, proto);

proto.y = 20;
proto.z = 40;

console.log('6-1:'+obj8.x);
console.log('6-2:'+obj8.y); 
console.log('6-3:'+obj8.z); 


function Rectangle() {
  
}
const rec = new Rectangle();

console.log('6-4:'+ (Object.getPrototypeOf(rec) === Rectangle.prototype));
Object.setPrototypeOf(rec, Object.prototype);
console.log('6-5:'+(Object.getPrototypeOf(rec) === Rectangle.prototype));

//7.super关键字
const proto2 = {
  foo: 'hello'
};

const obj9 = {
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj9, proto2); //proto2的原型赋给obj9
console.log('7-1:'+obj9.find()); 

const proto3 = {
  x: 'hello',
  foo () {
    var that = this;
    console.log(that.x);
  }
};

const obj10 = {
  x: 'world',
  foo() {
    super.foo();
  }
}
Object.setPrototypeOf(obj10, proto3);
obj10.foo(); 

//8.
let {keys, values, entries} = Object;
let obj11 = { a: 1, b: 2, c: 3 };

for (let key of keys(obj11)) {
  console.log(key); 
}

// for (let value of values(obj11)) {
//   console.log(value); 
// }

// for (let [key, value] of entries(obj11)) {
//   console.log([key, value]); 
// }