// 迭代器（Iterator）和生成器（Generator)

// var colors = ['red', 'green', 'blue'];
// // ES5通过变量i来跟踪colors数组的索引
// for (let i = 0; i < colors.length; i++) {
//   console.log(colors[i])
// }

// // 迭代器：特殊对象，具有专业接口，
// // next()方法，每次调用都返回一个结果对象
// // 结果对象两个属性：value：下一个将要返回的值；done：是否有更多可返回的数据
// function createIterator(items) {
//   var i = 0;
//   return {
//     next: function() {
//       var done = (i >= items.length);
//       var value = !done ? items[i++] : undefined;
//       return {
//         done: done,
//         value: value
//       };
//     }
//   }
// }
// var iterator = createIterator([1, 2, 3]);

// console.log(iterator.next())// {done: false, value: 1}
// console.log(iterator.next())// {done: false, value: 2}
// console.log(iterator.next())// {done: false, value: 3}
// console.log(iterator.next())// {done: true, value: undefined}
// // 之后所有的调用都会返回相同的内容
// console.log(iterator.next())// {done: true, value: undefined}


// // 生成器（*）：返回迭代器的函数
// // yield: 指定调用迭代器的next()的返回值（可以是任意值或表达式）及返回顺序
// // yield关键字不能穿透函数边界，只能用于生成器内部
// // 中止函数执行的能力：每当执行一条yield语句后函数就会自动停止执行
// function *createIterator() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// // 生成器的调用方式与普通函数相同，只不过返回的是一个迭代器
// let iterator = createIterator();
// console.log(iterator.next().value);// 1
// console.log(iterator.next().value);// 2
// console.log(iterator.next().value);// 3

// // 生成器函数表达式
// // ⚠️不能用箭头函数来创建生成器
// let createIterator = function *(items) {
//   for (let i = 0; i < items.length; i++) {
//     yield items[i];
//   }
// };
// let iterator = createIterator([1, 2, 3]);

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// // 之后所有的调用都会返回相同内容
// console.log(iterator.next());

// // 生成器对象的方法
// let o = {
//   *createIterator(items) {
//     for (let i = 0; i < items.length; i++) {
//       yield items[i];
//     }
//   }
// }
// let iterator = o.createIterator([1,2,3])
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// // 可迭代对象：与迭代器密切相关，具有Symbol.iterator属性
// // 所有的集合对象（数组|Set|Map)和字符串都是可迭代对象，这些对象中都有默认的迭代器
// // 所有通过生成器创建的迭代器都是可迭代对象：生成器默认会为Symbol.iterator属性赋值
// // for-of:每执行一次都会调用可迭代对象的next(),并将迭代器返回的结果对象的value属性存储在一个变量中，循环将持续执行这一过程直到返回对象的done属性的值为true;
// // Js引擎后台完成：通过调用values数组的Symbol.iterator()来获取迭代器
// // ⚠️for-of用于不可迭代对象、null、undefined会导致程序抛出错误
// let values = [1, 2, 3];
// for (let num of values) {
//   console.log(num);
// }

// // 访问默认迭代器
// let values = [1, 2, 3];
// let iterator = values[Symbol.iterator]();

// console.log(iterator.next());// {value: 1, done: false}
// console.log(iterator.next());// {value: 2, done: false}
// console.log(iterator.next());// {value: 3, done: false}
// console.log(iterator.next());// {value: undefined, done: true}

// // 检测对象是否为可迭代对象
// // 具有Symbol.iterator的对象都有默认迭代器
// function isIterable(object) {
//   return typeof  object[Symbol.iterator] === 'function';
// }
// console.log(isIterable([1, 2, 3]));// true
// console.log(isIterable('Hello'));// true
// console.log(isIterable({name: 'lulu'}));// false
// console.log(isIterable(new Map()));// true
// console.log(isIterable(new Set()));// true
// console.log(isIterable(new WeakMap()));// false
// console.log(isIterable(new WeakSet));// false

// // 创建可迭代对象
// // 默认情况下对象是不可迭代对象
// // 给Symbol.iterator添加一个生成器，则可以变成可迭代对象
// let collection = {
//   items: [],
//   *[Symbol.iterator]() {
//     for (let item of this.items) {
//       yield item;
      
//     }
//   }
// };
// collection.items.push(1)
// collection.items.push(2)
// collection.items.push(3)

// for (let x of collection){;
//   console.log(x);// 1,2,3
// }

// // 集合对象迭代器
// // entries(): 返回多个键值对
// // values(): 返回集合的值
// // keys(): 返回集合中的所有键名
// let colors = ['red', 'green', 'blue']
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set('title', 'Understanding ES 6');
// data.set('format', 'ebook');
// for (let entry of colors.entries()) {
//   console.log(entry);
// }
// for (let entry of tracking.entries()) {
//   console.log(entry);
// }
// for (let entry of data.entries()) {
//   console.log(entry);
// }

// // ❌ 无法运行，报语法错误
// let colors = ['red', 'green', 'blue']
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set('title', 'Understanding ES 6');
// data.set('format', 'ebook');
// for (let value of colors.values()) {
//   console.log(value);
// }
// for (let value of tracking.values()) {
//   console.log(value);
// }
// for (let value of data.values()) {
//   console.log(value);
// }
// let colors = ['red', 'green', 'blue']
// let tracking = new Set([1234, 5678, 9012]);
// let data = new Map();
// data.set('title', 'Understanding ES 6');
// data.set('format', 'ebook');
// for (let key of colors.keys()) {
//   console.log(key);
// }
// for (let key of tracking.keys()) {
//   console.log(key);
// }
// for (let key of data.keys()) {
//   console.log(key);
// }

// 总结：如果集合类型未指定迭代器，则会使用默认的迭代器

// // 在for-of循环解构
// let data = new Map();
// data.set('title','Understangding ES6');
// data.set('format','ebook');

// //与使用data.entries()相同
// for (let [key, value] of data) {
//   console.log(key + '=' + value);
// }

// // ES5：可以通过方括号访问字符串中的字符，(text[0]可以获取字符串text的第一个字符)
// // ⚠️在ES5中，由于方括号操作的是编码单元而非字符，因此无法正确的访问双字节字符
// // ES6全面支持Unicode
// var message = 'A 吉 B';
// for (let i = 0; i < message.length; i++) {
//   console.log(message[i]);
// }

// // DOM中的NodeList迭代器
// // NodeList：1、可以使用length属性获取集合中元素的数量
// // 2、可以通过方括号来访问集合中的独立元素
// // 3、 拥有默认迭代器，行为与数组的默认迭代器完全一致
// var divs = document.getElementsByTagName('div');
// for (let div of divs) {
//   console.log(div.id);
  
// }

// // 通过展开运算符讲可迭代对象转换为数组：因为展开运算符可以作用于任意可迭代对象
// let set = new Set([1, 2, 3, 3, 3, 4, 5]);
// let array = [...set];
// console.log(array);

// let map = new Map([['name', 'Nicholas'], ['age', 25]]);
// let array = [...map];
// console.log(array);

// let smallNumbers = [1, 2, 3],
//   bigNumbers = [100, 101, 102],
//   allNumbers = [0, ...smallNumbers, ...bigNumbers];

// console.log(allNumbers.length);
// console.log(allNumbers);


// //  给迭代器next()传递参数，则这个参数的值会替代生成器内部上一条yield的返回值
// // yield表达式本身没有返回值，或者说总是返回undefinedß
// function *createIterator() {
//   let first = yield 1;
//   let second = yield first + 2;
//   yield second + 3;
// }
// let iterator = createIterator();
// console.log(iterator.next()); // {value: 1, done:false}
// console.log(iterator.next(4));// {value: 6, done:false}
// console.log(iterator.next());// {value: NaN, done:false}
// console.log(iterator.next());// {value: undefined, done:true}

// // 通过throw()向迭代器传递错误条件
// function *createIterator() {
//   let first = yield 1;
//   let second = yield first + 2;// yield 4 + 2 ,然后抛出错误
//   yield second + 3; // 永远不会被执行
// }
// let iterator = createIterator();
// console.log(iterator.next());// {value: 1, done: false}
// console.log(iterator.next(4));// {value: 6, done: false}
// console.log(iterator.throw(new Error('Boom')));// 从生成器中抛出错误，从而终止代码的执行

// 在生成器内部捕获错误
// function *createIterator() {
//   let first = yield 1;
//   let second;

//   try {
//     second = yield first + 2; // yield 4+2 ,然后抛出错误
//   } catch (ex) {
//     second = 6;// 如果捕获到错误，则给变量second赋另一个值
//   }
//   yield second + 3;
// }
// let iterator = createIterator();
// console.log(iterator.next())
// console.log(iterator.next(4))
// console.log(iterator.throw(new Error('Boom')))
// console.log(iterator.next())


// // 生成器返回语句
// // return 表示所有操作已完成，属性done被设置为true，
// // 如果同时提供了相应的值，则属性value会被设置为这个值
// function *createIterator() {
//   yield 1;
//   return 42;
//   yield 2;
//   yield 3;
// }
// let iterator = createIterator();
// console.log(iterator.next())// {value: 1, done: false}
// console.log(iterator.next())// {value: 42, done: true}
// console.log(iterator.next())// {value: undefined, done: true}
// console.log(iterator.next())// {value: undefined, done: true}

// // 委托生成器(yield *)
// function *createNumberIterator() {
//   yield 1;
//   yield 2;
// }
// function *createColorIterator() {
//   yield 'red';
//   yield 'green';
// }
// function *createCombinedIterator() {
//   yield *createNumberIterator();
//   yield *createColorIterator();
//   yield true;
// }

// let iterator = createCombinedIterator();

// console.log(iterator.next())// {value: 1, done: false}
// console.log(iterator.next())// {value: 2, done: false}
// console.log(iterator.next())// {value: "red", done: false}
// console.log(iterator.next())// {value: "green", done: false}
// console.log(iterator.next())// {value: true, done: false}
// console.log(iterator.next())// {value: undefined, done: false}

// // 生成器的返回值和委托生成器的混合使用
// function *createNumberIterator() {
//   yield 1;
//   yield 2;
//   return 3;
// }
// function *createRepeatingIterator(count) {
//   for (let i = 0; i < count; i++) {
//     yield "repeat";
//   }
// }
// function *createCombinedIterator() {
//   let result = yield *createNumberIterator();
//   // 返回值3永远只存在于这个生成器的内部，永远不会被返回
//   // 如果想输出这个值，只能再添加一个yield语句
//   // yield result;
//   yield *createRepeatingIterator(result);
// }
// var iterator = createCombinedIterator();
// console.log(iterator.next()) // {value: 1, done: false}
// console.log(iterator.next()) // {value: 2, done: false}
// // console.log(iterator.next()) // {value: 3, done: false} 新添加的yield语句显示输出了第一个生成器的返回值
// console.log(iterator.next()) // {value: "repeat", done: false}
// console.log(iterator.next()) // {value: "repeat", done: false}
// console.log(iterator.next()) // {value: "repeat", done: false}
// console.log(iterator.next()) // {value: "repeat", done: false}

// // 传统异步：调用一个函数并执行响应的回调函数
// let fs = require('fs')
// fs.readFile('config.json', function(err, contents) {
//   if (err) {
//     throw err;
//   }

//   doSomethingWith(contents)
//   console.log('Done')
// })


// // 函数run接收一个生成器函数作为参数
// // 生成器函数定义了后续要执行的任务，生成一个迭代器并存在task中
// function run(taskDef) {
//   // 创建一个无使用限制的迭代器
//   let task = taskDef();
//   // 开始执行任务
//   let result = task.next();

//   // 循环调用next()的函数
//   function step() {
//     // 如果任务未完成，则继续执行
//     if (!result.done) {
//       result = task.next()
//       step()
//     }
//   }
//   // 开始迭代执行
//   step();
// }
// // 
// run(function *() {
//   console.log(1);
//   yield;
//   console.log(2)
//   yield;
//   console.log(3)
// })

// // 向任务执行器传递数据
// function run(taskDef) {
//   // 创建一个无使用限制的迭代器
//   let task = taskDef();

//   // 开始执行任务
//   let result = task.next();

//   // 循环调用next()的函数
//   function step() {
//     if (!result.done) {
//       result = task.next(result.value)
//       step();
//     }
//   }
//   // 开始迭代执行
//   step();
// }
// run(function *() {
//   let value = yield 1;
//   console.log(value);// 1

//   value = yield value + 3;
//   console.log(value);// 4
// })

// 异步任务执行器
// 通过延迟方法模仿异步调用
function fetchData() {
  return function (callback) {
    setTimeout(() => {
      callback(null, 'Hi!')
    }, 50);
  }
}
// 修改任务执行器
function run(taskDef) {
  // 创建一个无使用限制的迭代器
  let task = taskDef();

  // 开始执行任务
  let result = task.next();

  // 循环调用next()
  function step() {
    //  如果任务未完成，则继续执行
    if (!result.done) {
      if (typeof result.value === 'function') {
        // 传入一个回调函数作为参数来调用它
        // 回调函数遵循Node中关于执行错误的约定：
        // 第一个参数：所有可能的错误
        // 第二个参数：结果
        result.value(function (err, data) {
          if (err) {
            // 如果执行过程中产生了错误，则正确输出错误对象
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        })
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }
  // 开始迭代执行
  step();
}
// 从文件中读取数据
let fs = require('fs')

function readFile(filename) {
  console.log(function (callback) {
    fs.readFile(filename, callback);
  })
  return function (callback) {
    console.log(callback)
    fs.readFile(filename, callback);
  };
}
run(function *() {
  let contents = yield readFile('./object.js')
  doSomethingWith(contents);
  console.log('Done');
})

