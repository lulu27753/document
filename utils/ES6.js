// 强制要求参数
const required = () => {
  throw new Error('Missing parameter')
};
const add = (a = required(), b = required()) => a + b;
add(1, 2) //3
add(1) // Error: Missing parameter.

// 使用reduce同时实现map和filter
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2;
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50; // [60, 80]

// 使用reduce匹配圆括号
// 先声明一个 counter变量，初值为0
// 在遇到(时counter加一，遇到)时counter减一
// 如果左右括号数目匹配，那最终结果为0
const isParensBalanced = (str) => {
  return str.split('').reduce((counter, char) => {
      if (counter < 0) {
        //matched ")" before "("
        return counter;
      } else if (char === '(') {
        return ++counter;
      } else if (char === ')') {
        return --counter;
      } else {
        return counter;
      }
    }, 0);
}
isParensBalanced('(())') // 0 <-- balanced
isParensBalanced('(asdfds)') //0 <-- balanced
isParensBalanced('(()') // 1 <-- not balanced
isParensBalanced(')(') // -1 <-- not balanced

// 统计数组中相同项的个数
var cars = ['BMW','Benz','Benz','Tesla','BMW','Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
  }, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }

// 删除不需要的属性
let {
  _internal,
  tooBig,
  ...cleanObject
} = {
  el1: '1',
  _internal: "secret",
  tooBig: {},
  el2: '2',
  el3: '3'
};
console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}

// 在函数参数中解构嵌套对象
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // => model: bmw 2018  vin: 12345

// 合并对象
// 用扩展运算符来展开一个新的对象
// 第二个对象中的属性值会改写第一个对象的属性值
let object1 = {
  a: 1,
  b: 2,
  c: 3
}
let object2 = {
  b: 30,
  c: 40,
  d: 50
}
let merged = { ...object1, ...object2 }
console.log(merged) // {a:1, b:30, c:40, d:50}

