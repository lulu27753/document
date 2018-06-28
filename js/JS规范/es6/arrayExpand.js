//1.扩展运算符
console.log(...[1, 2, 3]);
//扩展运算符与正常的函数参数可以结合使用
function f(v, w, x, y, z) {return v+w+x+y+z; }
const args = [0, 1];
console.log(f(-1, ...args, 2, ...[3]));

//2.复制数组
//直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
const a1 = [1, 2];
const a2 = a1;
console.log('a2:'+a2);
a2[0] = 2;
console.log('a1:'+a1); 

// 写法一
const a3 = [3, 4];
const a4 = [...a3];
console.log('a4:'+a4);
a4[0] = 4;
console.log('a3:'+a3);

// 写法二
const a5 = [5, 6];
const [...a6] = a5;
console.log('a6:'+a6);
a6[0] = 6;
console.log('a5:'+a5);


//3.合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
console.log(arr1.concat(arr2, arr3));
// ES6的合并数组
console.log([...arr1, ...arr2, ...arr3]);

//4.与解构赋值结合
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log('first:'+ first);
console.log('rest:'+  typeof(rest));  

// const [...butLast, last] = [1, 2, 3, 4, 5];


//5.字符串
console.log('x\uD83D\uDE80y'.length);
console.log([...'x\uD83D\uDE80y'].length);

//6.map和set结构
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; 
console.log(arr);

//7.array.from()
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr4 = [].slice.call(arrayLike); // ['a', 'b', 'c']
console.log(arr4);
// ES6的写法
let arr5 = Array.from(arrayLike); // ['a', 'b', 'c']
console.log(arr5);

console.log(Array.from({ length: 3 }));

//8.array.of()
console.log(Array(3));
console.log(Array(3, 11, 8));

console.log(Array.of(3));
console.log(Array.of(3, 11, 8));

//9.copyWithIn()
console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
console.log([1, 2, 3, 4, 5].copyWithin(0, -2, -1)); //起始值为负值，在其基础上加上数组长度。
console.log([1, 2, 3, 4, 5].copyWithin(0, -8, -1)); //由于加上数组长度后还为负值，所以原数组不变

//10.find和findIndex
console.log([1, 4, -5, 10].find((n) => n < 0));
console.log([1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}))
console.log([1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
})); 

//11.fill
console.log(['a', 'b', 'c'].fill(7));
console.log(new Array(3).fill(7))
console.log(['a', 'b', 'c'].fill(7, 1, 2));

//12.遍历
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}

for (let index of ['a', 'b'].keys()) {
  console.log(index);
}

// for (let elem of ['a', 'b'].values()) {
//   console.log(elem);
// }
console.log('****'+['a', 'b'].values());


//13.inlcudes
console.log([1, 2, 3].includes(2));     
console.log([1, 2, 3].includes(4));     
console.log([1, 2, NaN].includes(NaN)); 

//第二个参数表示起始位置，如果为负数，则加上数组的长度。
console.log([1, 2, 3].includes(3, 3));  
console.log([1, 2, 3].includes(2, -2)); 
console.log([1, 2, 3].includes(1, -5)); //当加上数组的长度后还是负数，则从0开始

console.log([NaN].indexOf(NaN));