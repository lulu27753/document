// Promise是另一种异步编程的选择
// 既可以像事件和回调函数一样指定稍后执行的代码，也可以明确指示代码是否成功执行
// 基于这些成功或失败的状态，为了让代码更容易理解和调试，可以链式地编写Promise
// JS是基于单线程事件循环的，同一时刻只能执行一个代码块
// 即将运行的代码被放在一个任务队列(job queue)中
// 每当JavaScript引擎中的一段代码结束执行，(event loop)会执行队列中的下一个任务
// event loop：负责监控代码执行并管理任务队列的一段程序

// // 事件模型
// let button = document.getElementById('my-btn')
// button.onclick = function(event) {
//   console.log('Clickeds')
// }

// // 回调模式
// fs = require('fs')
// fs.readFile('example.txt', function(err, contents) {
//   if (err) {
//     throw err;
//   }

//   console.log(contents);
//   console.log(1);
// });
// console.log('Hi!');

// // 回调模式比事件模式灵活，因为通过回调模式链接多个调用更容易
// // 回调函数的局限性：回调地狱，难以调试和理解
// // 并行执行两个异步操作，当两个操作都结束时通知你
// // 同时进行两个异步操作，只取优先完成的操作结果
// readFile('example.txt', function(err, contents) {
//   if (err) {
//     throw err;
//   }

//   writeFile('example.txt', function(err) {
//     if (err) {
//       throw err;
//     }

//     console.log('File was written!')
//   })
// })

// // Promise相当于异步操作结果的占位符
// // Promise生命周期：
// // pending：进行中，操作尚未完成，所以也是未处理(unsettled)
// // settled: 一旦异步操作执行结束，Promise则变为已处理状态
// // fullfilled: Promise 异步操作成功完成
// // rejected: 由于程序错误或一些其他原因,异步操作未能成功完成
// // 一个对象实现了then(),则被称为thenable对象
// // 所有的Promise对象都是thenable对象，但并非所有thenable对象都是Promise
// let fs = require('fs');
// function readFile(filename) {
//  // 创建未处理Promise 
//   // 构造函数Promise只接收一个参数
//   // @params：执行器函数：包含初始化Promise代码
//   // 执行器：接收两个参数：resolve()和reject()
//   // readFile()执行时，执行器函数会立即执行
//   // 而完成处理程序和拒绝处理程序总是在执行器完成后被添加到任务队列的末尾
//   return new Promise(function(resolve, reject) {
//     // 触发异步操作
//     fs.readFile(filename, {encoding: 'utf8'}, function(err, contents) {
//       // 检查是否有错误
//       if (err) {
//         reject(err);
//         return;
//       }

//       // 成功读取文件
//       resolve(contents);
//     })
//   })
// }
// let promise = readFile('example.txt')
// promise.then(function(contents) {
//   // 完成
//   console.log(contents)
// }, function(err) {
//   // 拒绝
//   console.log(err.message)
// });

// promise.then(function(contents) {
//   // 完成
//   console.log(contents)
// });

// promise.then(null, function(err) {
//   // 拒绝
//   console.error(err.message);
// });
 
// promise.catch(function(err) {
//   // 拒绝
//   console.error(err.message);
  
// })
// // 如果不给Promise添加拒绝处理程序，那所有失败就自动被忽略了
// // 所以一定要添加拒绝处理程序，即使只在函数内部记录失败的结果也行
// // 如果一个Promise处于已处理状态(无论是否成功)，在这之后添加到任务队列中的处理程序仍将执行
// // 每次调用then()或catch()都会创建一个新任务，当Promise被解决(resolved)时执行
// // 这些任务会被加入到一个为Promise量身定制的独立队列中

// // 创建已处理的Promise:不会有任务编排的过程，这个Promise会直接被返回
// // Promise.resolve():只接收一个参数并返回一个完成态的Promise
// let promise = Promise.resolve(42);
// promise.then(function(value) {
//   console.log(value); // 42
// })
// // Promise.reject():只接收一个参数并返回一个拒绝态的Promise
// let promise = Promise.reject(42);
// promise.catch(function(value) {
//   console.log(value);  // 42
// })

// // Thenable对象:拥有then()方法并接受resolve和reject这两个参数的普通对象
// let thenable = {
//   then: function(resolve, reject) {
//     resolve(42);
//   }
// };
// let p1 = Promise.resolve(thenable);
// p1.then(function(value) {
//   console.log(value) // 42
// })

// 每个执行器中都隐含一个try-catch块，所以错误会被捕获并传入拒绝处理程序
// 但只有当拒绝处理程序存在时才会记录执行器中抛出的错误
// let promise = new Promise(function(resolve, reject) {
//   throw new Error('Explosion!');
// })
// promise.catch(function(error) {
//   console.error(error.message);// "Explosion!"
// })

// // 等同于如下：
// let promise = new Promise(function(resolve, reject) {
//   try {
//     throw new Error('Explosion!');
//   } catch (ex) {
//    reject(ex);
//   }
// })
// promise.catch(function(error) {
//   console.error(error.message);// "Explosion!"
// })

// // Node环境的拒绝处理
// // unhandledRejection:在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理程序时，触发该事件
// let rejected;
// process.on('unhandledRejection', function(reason, promise) {
//   console.log(reason.message);// Explosion
//   console.log(rejected === promise)// true
// });

// rejected = Promise.reject(new Error('Explosion!'));

// // rejectionHandled:在一个事件循环后，当Promise被拒绝时，若拒绝处理程序被调用，触发该事件
// let rejected;
// process.on('rejectionHandled', function(promise) {
//   console.log(rejected === promise); // true
// })
// rejected = Promise.reject(new Error('Explosion!'));

// // 等待添加拒绝处理程序
// setTimeout(() => {
//   rejected.catch(function(value) {
//   console.log(value.message) // Explosion
//   })
// }, 1000);

// // 未处理拒绝跟踪器
// // 用Map集合来存储Promise及其拒绝原因
// let possiblyUnhandledRejections = new Map();

// // 如果一个拒绝没被处理，则将它添加到Map集合中
// process.on('unhandledRejection', function(reason, promise) {
//   possiblyUnhandledRejections.set(promise, reason);
// });
// // 已处理的Promise会从Map集合中移除
// process.on('rejectionHandled', function(promise) {
//   possiblyUnhandledRejections.delete(promise);
// })
// // 定期检查列表，将可能未处理的拒绝输出到控制台
// // (实际上你会通过其他方式记录或者直接处理掉这个拒绝)
// setInterval(() => {
//   possiblyUnhandledRejections.forEach(function(reason, promise) {
//     console.log(reason.message ? reason.message : reason);

//     // 做一些什么来处理这些拒绝
//     handleRejection(promise, reason);
//   });
//   possiblyUnhandledRejections.clear();
// }, 60000);

// // 浏览器环境的拒绝处理
// // unhandledrejection:在一个事件循环中，当Promise被拒绝，并且没有提供拒绝处理程序时，触发该事件；
// // rejectionhandled:在一个事件循环后，当Promise被拒绝时，若拒绝处理程序被调用，触发该事件。
// // event事件对象：三个属性：1.type：事件名称；2.promise：被拒绝的Promise对象；3.reason：来自Promise的拒绝值

// let rejected;
// window.onunhandledrejection = function(event) {
//   console.log(event.type)// 'unhandledrejection'
//   console.log(event.reason.message);// 'Explosion!'
//   console.log(rejected === event.promise);// true
// }
// window.onrejectionhandled = function(event) {
//   console.log(event.type);// 'onrejectionhandled'
//   console.log(event.reason.message); // 'Explosion!'
//   console.log(rejected === event.promise); // true
// }
// rejected = Promise.reject(new Error('Explosion!'));

// // 浏览器中跟踪未处理拒绝的代码
// let possiblyUnhandledRejections = new Map()
// // 如果一个拒绝没被处理，则将它添加到Map集合中
// window.onunhandledrejection = function(event) {
//   possiblyUnhandledRejections.set(event.promise, event.reason)
// }
// // 已处理的Promise会从Map集合中移除 process.on('rejectionHandled', function(promise) {
// window.onrejectionhandled = function(event) {
//   possiblyUnhandledRejections.delete(event.promise);
// }
// // 定期检查列表，将可能未处理的拒绝输出到控制台 
// // (实际上你会通过其他方式记录或者直接处理掉这个拒绝) 
// setInterval(() => {
//   possiblyUnhandledRejections.forEach(function(reason, promise) {
//     console.log(reason.message ? reason.message : reason);
//     // 做一些什么来处理这些拒绝
//     handleRejection(promise, reason);
//   });
//   possiblyUnhandledRejections.clear();
// }, 60000);

// // 串联Promise
// // 每次调用then()或catch()实际上创建并返回了另一个Promise,只有当第一个Promise完成或被拒绝后，第二个才会被解决
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// });

// p1.then(function(value) {
//   console.log(value)
// }).then(function() {
//   console.log("Finished");
// });


// // ⚠️务必在Promise链的末尾留有一个拒绝处理程序以确保能够正确处理所有可能发生的错误
// let p1 = new Promise(function(resolve, reject) {
//   throw new Error('Explosion!');
// });
// p1.catch(function(error) {
//   console.log(error.message);
//   throw new Error('Boom!')
// }).catch(function(error) {
//   console.log(error.message);
// })

// // Promise链的返回值：可以给下游Promise传递数据
// let p1 = new Promise(function(resolve, reject) {
//   reject(42);
// });
// p1.catch(function(value) {
//   // 第一个完成处理程序
//   console.log(value);// 42
//   return value + 1;
// }).then(function(value) {
//   console.log(value);// 43
// })

// // 在promise链中返回Promise
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// });
// let p2 = new Promise(function(resolve, reject) {
//   resolve(43);
// })
// p1.then(function(value) {
//   // 第一个完成处理程序
//   console.log(value); // 42
//   return p2;
// }).then(function(value) {
//   // 第二个完成处理程序
//   // ⚠️第二个完成处理程序被添加到了第三个Promise，而不是p2
//   console.log(value); // 43
// })

// // 等同于
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// });
// let p2 = new Promise(function(resolve, reject) {
//   resolve(43);
// })
// let p3 = p1.then(function(value) {
//   console.log(value);// 42
//   return p2;
// })
// p3.then(function(value) {
//   // 第二个完成处理程序
//   console.log(value);// 43
// })
// // 如果p2被拒，那么第二个完成处理程序将不会被调用
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// });
// let p2 = new Promise(function(resolve, reject) {
//   reject(43);
// })
// let p3 = p1.then(function(value) {
//   console.log(value);// 42
//   return p2;
// })
// p3.then(function(value) {
//   // 第二个完成处理程序
//   console.log(value);// 从未调用
// }).catch(function(value) {
//   console.log(`catch: ${value}`);
// })

// // 响应多个promise：Promise.all()和Promise.race()
// // Promise.all():参数：包含多个受监视的Promise的可迭代对象
// // 返回一个Promise
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// })
// let p2 = new Promise(function(resolve, reject) {
//   resolve(43);
// })
// let p3 = new Promise(function(resolve, reject) {
//   resolve(44);
// })
// let p4 = Promise.all([p1, p2, p3]);
// p4.then(function(value) {
//   console.log(Array.isArray(value));
//   console.log(value[0]);
//   console.log(value[1]);
//   console.log(value[2]);
// })

// // Promise只要有一个被拒绝，那么返回的Promise没等所有Promise都完成就立即被拒绝
// let p1 = new Promise(function(resolve, reject) {
//   resolve(42);
// })
// let p2 = new Promise(function(resolve, reject) {
//   reject(43);
// })
// let p3 = new Promise(function(resolve, reject) {
//   resolve(44);
// })
// let p4 = Promise.all([p1, p2, p3])

// p4.then(function(value) {
//   console.log("不执行" + Array.isArray(value));
//   console.log("不执行" + value)
// }).catch(function(value) {
//   console.log(Array.isArray(value));
//   console.log(value)
// })
// // Promise.race()：只要有一个Promise被解决返回的Promise就被解决，无须等到所有Promise都被完成
// let p1 = Promise.resolve(42)
// let p2 = new Promise(function(resolve, reject) {
//   reject(43);
// })
// let p3 = new Promise(function(resolve, reject) {
//   resolve(44);
// })
// let p4 = Promise.race([p1, p2, p3])

// p4.then(function(value) {
//   console.log(Array.isArray(value));
//   console.log(value)
// })
// // 被拒绝:race()返回的Promise会决出哪一个先被解决，然后返回，其他的结果会被忽略(p1|p3最终会被完成)
// let p1 = new Promise(function(resolve, reject) {
//   reject(42);
// })
// let p2 = Promise.reject(43)
// let p3 = new Promise(function(resolve, reject) {
//   resolve(44);
// })
// let p4 = Promise.race([p1, p2, p3])

// p4.then(function(value) {
//   console.log(Array.isArray(value));
//   console.log(value)// 43
// })

// 以Promise作为通用接口用于所有异步代码
let fs = require('fs')
function run(taskDef) {
  // 创建迭代器
  let task = taskDef()
  // 开始执行任务
  let result = task.next()
  // 递归函数遍历
  (function step() {
    // 如果有更多的任务要做
    if (!result.done) {
      // 用一个Promise来解决会简化问题
      let promise = Promise.resolve(result.value)
      promise.then(function(values) {
        result = task.next(value)
        step()
      }).catch(function(error) {
        result = task.throw(error)
        step()
      })
    }
  })();
}
// 定义一个可用于任务执行器的函数
function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, contents) {
      if (err) {
       reject(err); 
      } else {
        resolve(contents);
      }
    });
  });
}
// 执行一个任务
run(function *() {
  let contents = yield readFile('config.json')
  doSomethingWith(contents)
  console.log("Done")
})
// async(*):表示该函数以异步模式运行
// await(yield):表示调用的函数应该返回一个Promise

