// 1.
// setTimeout(function () {
//   console.log('setTimeout')
// });
// process.nextTick(function () {
//   console.log('nextTick');
// })
// new Promise(function (resolve) {
//   console.log('Promise');
//   for (var i = 0; i < 10000; i++) {
//     i == 99 && resolve();
//   }
// }).then(function () {
//   console.log('Promise：then')
// });

// console.log('代码执行结束');

// Promise
// 代码执行结束
// nextTick
// Promise：then
// setTimeout

// 2.
console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})
process.nextTick(function () {
  console.log('6');
})
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
})

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})
// 1，7, 6, 8, 2, 4, 9, 11, 3, 10, 5, 12
