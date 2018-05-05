// // 解构：一种打破数据解构，将其拆分为更小部分的过程
// // 应用场景：1.变量声明
// //2.变量赋值
// let node = {
//   type: 'Identifier',
//   name: 'foo'
// };
// let type = 'Literal';
// let name = 5;
// // 使用解构语法为多个变量赋值
// // ⚠️JS引擎将一对开放的花括号视为一个代码块
// // 语法规定代码块语句不允许出现在赋值语句左侧
// // 添加小括号可以将块语句转化为一个表达式
// ({type, name, value} = node);
// console.log(type);
// console.log(name); 
// console.log(value);

// let node = {
//   type: 'Identifier',
//   name: 'foo'
// };
// let {type, name, value, Default = ''} = node;
// console.log(type);
// console.log(name);
// console.log(value);
// console.log(Default);

// // 为非同名局部变量赋值
// let node = {
//   type: 'Idetifier',
//   name: 'foo'
// };
// // 读取名为type的属性并将其值存储在变量localType
// // 变量名称在冒号右边，需要读取的位置（对象的属性名）在左边
// let { type: localType, name: localName = 'bar' } = node;
// console.log(localType) // Idetifier
// console.log(localName) // foo


// // 嵌套对象解构
// let node = {
//   type: 'Identifier',
//   name: 'foo',
//   loc: {
//     start: {
//       line: 1,
//       column: 1
//     },
//     end: {
//       line: 1,
//       column: 4
//     }
//   }
// };
// // 所有冒号前的标识符都代表在对象中的检索位置
// // 其右侧为被赋值的变量名
// // 冒号后如果是花括号：则意味着要赋予的最终值嵌套在对象内部更深的层级中
// let { loc: { start }} = node;

// console.log(start.line) // 1
// console.log(start.column)// 1

// // 数组解构（场景1）：通过值在数组中的位置进行选取，且可以将其存储在任意变量中，未显式声明的元素都会直接被忽略
// let colors = ['red', 'green', 'blue'];
// let [ , , thirdColor] = colors;
// console.log(thirdColor);// bule

// // （场景2）：也可用于解构赋值
// let colors = ['red', 'green', 'blue'];
// let firstColor = 'black';
// let secondColor = 'purple';
// [firstColor, secondColor] = colors;
// console.log(firstColor);// red
// console.log(secondColor)

// // （场景3）：交换两个变量的值
// // ES5:引入第三个临时变量
// let a = 1,
// b = 2,
// tmp;

// tmp = a;
// a = b;
// b = tmp;
// console.log(a);// 2
// console.log(b);// 1

// // ES6中交换变量
// let a = 1,
// b = 2;

// [a, b] = [b, a];

// console.log(a);// 2
// console.log(b);// 1

// // ES5克隆数组：concat()连接两个数组，如果调用时不传递参数就会返回当前数组的副本
// var colors = ['red', 'green', 'blue'];
// var clonedColors = colors.concat();
// console.log(clonedColors); // ['red', 'green', 'blue']

// // ES6克隆数组：通过不定元素的语法来实现
// let colors = ['red', 'green', 'blue'];
// let [ ...clonedColors ] = colors;
// console.log(clonedColors); // ['red', 'green', 'blue']

// // 混合解构
// let node = {
//   type: 'Identifier',
//   name: 'foo',
//   loc: {
//     start: {
//       line: 1,
//       column: 1
//     },
//     end: {
//       line: 1,
//       column: 4
//     },
//     range: [0, 3]
//   }
// };
// let {loc : {start}, range: [startIndex]} = node;
// console.log(start.line);// 1
// console.log(start.column);// 1
// // console.log(startIndex);// 0

// // options的属性表示其他参数
// // name|value是必需参数，而secure|path|domain|expires是可选的且没有优先级顺序，无法列为额外的命名参数
// // 将其他参数用options对象设置同名的命名属性
// // 然而仅查看函数的声明部分，无法辨识函数的预期参数，必须通过阅读函数体才可以确定所有参数的情况
// function setCookie(name, value, options) {
//   options = options || {};

//   let secure = options.secure;
//   let path = options.path;
//   let domain = options.domain;
//   let expires = options.expires;

//   // 设置cookie的代码
// }

// // 第三个参数映射到options中
// setCookie('type', 'js', {
//   secure: true,
//   expires: 60000 
// })

// function setCookie(name, value, {secure, path, domain, expires}) {
//   // 设置cookie的代码
// }
// setCookie('type', 'js', {
//   secure: true,
//   expires: 60000
// }); 
// setCookie('type', 'js')// 不传入解构参数会使得其值为undefined，因为报错
// // 解决方案为其传入初始值
// function setCookie(name, value, {secure, path, domain, expires} = {
//   secure: false,
//   path: '/',
//   domain: 'example.com',
//   expires: new Date(Date.now() + 360000000)
// }) {
//   // ...
// }

const setcookieDefaults = {
  secure: false,
  path: '/',
  domain: 'example.com',
  expires: new Date(Date.now() + 360000000)
};

function setCookie(name, value, {
  secure = setcookieDefaults.secure,
  path = setcookieDefaults.path,
  domain = setcookieDefaults.domain,
  expires = setcookieDefaults.expires
} = setcookieDefaults) {
  // ...
}




