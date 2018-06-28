// 块级声明： 声明在指定块的作用域之外无法访问的变量；存在于1函数内部2块中
// 由于let声明不会被提升，因此通常将let声明语句放在封闭代码块的顶部，以便整个代码块都可以访问
// 执行流离开if块，value立刻被销毁。如果condition的值为false，就永远不会声明并初始化value

function getValue(condition) {
  if (condition) {
    let value = 'blue';
    console.log('value0' + value);
  } else {
    console.log('value1' + value);
    // ❌value在此处不存在
  }
  console.log('value2' + value);
  // ❌value在此处不存在
}

// getValue()

// const 声明的是常量，值一旦声明则不可更改，因此每个声明的常量必须初始化
// const name; // ❌语法错误，常量未初始化

// const 和 let 都不能重复声明，但是不可以为const定义的常量再赋值，而let却可以。

// const 不允许修改绑定，但允许修改值；即用const声明的对象，可以修改该对象的属性值。
// const person = {
//   name: 'lulu'
// }
// // 可以修改对象属性的值，因为修改的是person包含的值
// person.name = 'liuliu';
// console.log(person.name)
// // ❌直接给person赋值，即要改变person的绑定，抛出"语法错误"
// person = {
//   name: 'Greg'
// }

// 临时死区：JS引擎在扫描代码发现变量时，要么提升至作用域顶部(var),要么将声明放到TDZ(let|const)
// 只有执行过变量声明语句后，变量才会从TDZ中移出，然后方可正常访问。
// let condition = true;
// if (condition) {
//   console.log(typeof value);// "引用错误"
//   let value = 'blue';// 该语句不会执行，因为此时的value还在TDZ中
// }
// 在let的作用域外则不会报错
// let condition = true;
// console.log(typeof value); // "undefined"
// if (condition) {
//   let value = 'blue'; // 该语句不会执行，因为此时的value还在TDZ中
// }

// var声明的i得到了变量提升
// for (var i = 0; i < 10; i++) {
//   console.log('inner ' + i) // 0|1|2|3|4|5|6|7|8|9
// }
// console.log('outer ' + i) // 10

// for循环的块级作用域可以把随意声明的计数器变量限制在循环内部
// 变量i只存在于for循环中，一旦循环结束，在其他地方均无法访问该变量
// for (let i = 0; i < 10; i++) {
//   console.log('inner ' + i) // 0|1|2|3|4|5|6|7|8|9
// }
// console.log('outer ' + i) // i在这里不可访问，抛出引用错误

// 循环中的函数
// var funcs = [];
// for (var i = 0; i < 10; i++) {
//   funcs.push(
//     function () {
//       console.log(i);
//     }
//   )
// }
// funcs.forEach(function(func) {
//   func(); // 输出10次数字10,而不是0-9；
//   // 因为循环里的每次迭代同时共享着变量i，循环内部创建的函数全部保留了对相同变量的引用。循环结束时变量i的值为10
// })

// 立即调用函数表达式(IIFE)强制生成计数器变量的副本
// IIFE为接受的每个变量i都创建了一个副本并存储为变量value
// var funcs = [];
// for (var i = 0; i < 10; i++) {
//   funcs.push((function (value) {
//     return function () {
//       console.log(value);
//     }
//   }(i)));
// }
// funcs.forEach(function (func) {
//   func();// 输出0-9
// });

// 循环中的let声明
// let声明使得每次迭代循环都会创建一个新变量，并以之前迭代中同名变量的值将其初始化
var funcs = [];
for (let i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i);
  })
}
funcs.forEach(function (func) {
  func();
})
// ⚠️如果希望在全局对象下定义变量，仍然可以使用var。这种情况常见于在浏览器中跨frame或跨window访问代码。
// ⚠️最佳实践：默认使用const,只有确实需要改变变量的值时使用let。
// 因为大部分变量的值在初始化后不应再改变，而预料外的变量值的改变是很多bug的源头。

