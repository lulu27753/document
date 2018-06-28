// // ES6以前，JS“共享一切“
// // 模块：自动运行在严格模式下并且没有办法退出运行的JS代码
// // 在模块的顶部：this的值是undefined
// // 模块不支持HTML风格的代码注释

// // 导出的基本语法
// // 导出数据
// // 该文件名为example.js
// export var color = 'red'
// export let name = 'lulu'
// export const magicNumber = 7;
// // 导出函数
// export function sum(num1, num2) {
//   return num1 + num2;
// }
// // 导出类
// export class Rectangle {
//   constructor(length, width) {
//     this.length = length;
//     this.width = width;
//   }
// }
// // 这个函数是模块私有的
// // 任何未显式导出的变量、函数、或类都是模块私有的，无法从模块外部访问
// function subtract(num1, num2) {
//   return num1 + num2;
// }
// // 定义一个函数。。
// function multiply(num1, num2) {
//   return num1*num2;
// }
// // ...之后将它导出
// // 不必总是导出声明，可以导出引用
// export multiply;

// // 导入的基本语法
// // Node遵循基于文件系统前缀区分本地文件和包的惯例
// // 浏览器使用的路径格式与传给<script>元素的相同
// // ⚠️导入绑定的列表看起来与解构对象很相似，但它不是
// // 从模块中导入一个绑定时，如使用const定义的一样，你无法定义另一个同名变量(包括导入另一个同名绑定)，也无法在import语句前使用标识符或改变绑定的值
// // 导入单个绑定
// import { sum } from './example.js';
// console.log(sum(1, 2)); // 3
// sum = 1; // 抛错，因为不能给导入的绑定重新赋值
// // 导入多个绑定
// import {sum, multiply, magicNumber} from './example.js';
// console.log(sum(1, magicNumber)); // 8
// console.log(multiply(1, 2));// 2
// // 导入整个模块:导出默认值及所有命名导出值
// // 命名空间导入(namespace import)
// import * as example from './example.js';
// console.log(example.sum(1, example.magicNumber));// 8
// console.log(example.multiply(1, 2));// 2

// // 导入模块的代码执行后，实例化过的模块被保存在内存中
// // 只要在同一应用程序中的其他模块也从example.js导入绑定，那么那些模块与此代码使用相同的模块实例
// // example.js只执行一次
// import {sum} from './example.js';
// import {multiply} from './example.js';
// import {magicNumber} from './example.js';

// // 标识符只有在被导出的模块中可以修改，即便是导入绑定的模块也无法更改绑定的值
// // 以下是我们将要使用的模块
// export var name = 'lulu'
// export function setName(newName) {
//   name = newName;
// }
// // 当导入模块后，setName()可以改变name的值
// import { name, setName } from './example.js';
// console.log(name);// 'lulu'
// setName('liuliu');
// console.log(name);// 'liuliu'

// name = 'lulu'// 抛出错误

// // 可以在模块导出和导入过程中改变导出元素的名称
// // 用as关键字来指定函数在模块外应该被称为什么名称
// function sum(num1, num2) {
//   return num1 + num2;
// }
// export { sum as add };

// import { add } from './example.js';

// import { add as sum } from './example.js';
// console.log(typeof add);// 'undefined'
// console.log(sum(1, 2));// 3

// // 模块的默认值：通过default关键字指定的单个变量、函数或类
// // 只能为每个模块设置一个默认的导出值，导出时多次使用default关键字是一个语法错误
// // 该示例模块导出了一个函数作为它的默认值，由于函数被模块所代表，因为它不需要一个名称
// export default function(num1, num2) {
//   return num1 + num2;
// }
// // 为默认导出值指定标识符；使用重命名语法
// function sum(sum1, sum2) {
//   return num1 + sum2;
// }
// export { sum as default }

// // 导入默认值时不需要使用大括号
// // example.js模块
// export let color = 'red'
// export default function(num1, num2) {
//   return num1 + num2;
// }
// // 可以用一条语句导入所有导出的默认值和非默认值
// import sum, {color} from './example.js';
// // import {default as sum, color } from './example.js';
// console.log(sum(1, 2));// 3
// console.log(color);// red

// // 无绑定导入：常被用于创建Polyfill和Shim
// // 没有export或import的模块代码
// // 内建对象（如Array和Object）的共享定义可以在模块中访问
// Array.prototype.pushAll = function (items) {
//   // items必须是一个数组
//   if (!Array.isArray(items)) {
//     throw new TypeError('参数必须是一个数组！')
//   }
//   // 使用内建的push()和展开运算符
//   return this.push(...items);
// }

// import './example.js';
// let colors = ['red', 'green','blue']
// let items = [];
// items.pushAll(colors)

// // 浏览器中使用一个模块
// // 加载一个Js模块文件
// <script type="module" src="module.js"></script>
// // 内联引入一个模块
// <script type="module">
//   import {sum} from './example.js';
//   let result = sum(1, 2);
// </script>

// // 模块加载顺序
// // <script type='module'></script>执行时自动应用defer属性
// // 在文档完全被解析后，模块也按照它们在包含文档中出现的顺序依此执行
// // 将模块作为Worker加载
// let worker = new Worker('module.js', {type: 'module'});
















