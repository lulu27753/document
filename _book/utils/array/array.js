// js取数组两个数组的交集|差集|并集|补集|去重

// each是一个集合迭代函数，它接受一个函数作为参数和一组可选的参数
// 这个迭代函数依次将集合的每一个元素和可选参数用函数进行计算，并将计算的结果集返回
// * @param {Function} fn 进行迭代判定的函数
// * @param more ...零个或多个可选的用户自定义参数 
// * @returns {Array}结果集，如果没有结果，返回空集

Array.prototype.each = function (fn) {
  fn = fn || Function.K;
  var a = [];
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < this.length; i++) {
    var res = fn.apply(this, [this[i], i].concat(args));
    if (res != null) 
      a.push(res);
    }
  return a;
};
var a = [1, 2, 3, 4].each(function (x) {
  return x > 3 ? x : null
});
var b = [1, 2, 3, 4].each(function (x) {
  return x < 0 ? x : null
});
console.log('a',a);
console.log('b',b);

// 得到一个数组不重复的元素集合
// 唯一化一个数组
// * @returns {Array} 由不重复元素构成的数组
Array.prototype.uniquelize = function () {
  var ra = new Array();
  for (var i = 0; i < this.length; i++) {
    if (!ra.includes(this[i])) {
      ra.push(this[i]);
    }
  }
  return ra;
};

// * @param {Array}a 集合A 
// * @param {Array}b 集合B 
// * @returns {Array}两个集合的交集
Array.intersect = function(a, b){  
     return a.uniquelize().each(function(o){return b.includes(o) ? o : null});  
};

// * @param {Array}a 集合A 
// * @param {Array}b 集合B 
// * @returns {Array}两个集合的差集
Array.minus = function(a, b){  
     return a.uniquelize().each(function(o){return b.includes(o) ? null : o});  
};
const A = [1,2,3,4,5]
const B = [2,4]
const C = Array.minus(A, B)
console.log(C);


// * @param {Array}a 集合A 
// * @param {Array}b 集合B 
// * @returns {Array}两个集合的并集
Array.union = function(a, b){  
     return a.concat(b).uniquelize();  
};

// 求两个集合的补集
// * @param {Array}a 集合A 
// * @param {Array}b 集合B 
// * @returns {Array} 两个集合的补集
Array.complement = function (a, b) {
  return Array.minus(Array.union(a, b), Array.intersect(a, b));
};


const M = 10;
const N = 15;

for (let i = 0; i < M; i++) {
  const containers = []
  const item = {}
  item.x = i
  for (let j = 0; j < N; j++) {
    item.y = j
    containers.push(item)
  }
  return containers
}
console.log('containers',containers);
