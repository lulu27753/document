/*
* 返回一个在myMin(包括myMin)和myMax(包括myMax)之间的随机数
* @param myMin: 最小值
* @param myMax：最大值
* @returns {number}
*/
function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

/*
* 句中单词首字母大写
* @param str: 字符串语句
* @returns {string}
*/
function titleCase(str) {
  var newStr = str.split(' ').map(
    function(str) {
     return str.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();});
    } 
  ).join(' ');
  return newStr;
}
/*
* 判断一个字符串(str)是否以指定的字符串(target)结尾
* @param str: 字符串语句
* @param target: 字符串结尾
* @returns {boolean}
*/
function confirmEnding(str, target) {
  return str.substr(-target.length,target.length) === target;
}
/*
* 用瑞兹来截断对面的退路,如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。切记，插入到字符串尾部的三个点号也会计入字符串的长度。
* @param str: 字符串语句
* @param num: 要截断的字符数
* @returns {string}
*/
function truncate(str, num) {
  // 请把你的代码写在这里
  if (str.length <= num) return str;
  if (num > 3 && str.length > num) {
   return str.slice(0, num-3) + '...';
  } else {
   return str.slice(0, num) + '...';
  }
}

/*
* 将数组分割成几个小数组
* @param arr: 数组
* @param size: 分割的数组的长度
* @returns {array}
*/
function chunkArr(arr, size) {
  var result = [];
  for (var x = 0; x < Math.ceil(arr.length / size); x++) {
    var start = x * size;
    var end = start + size;
    result.push(arr.slice(start, end));
  }                
  return result;
}
/*
* 给定数字范围求和
* @param arr: 数组,数字范围
* @returns {number}：返回和
*/

function sumAll(arr) {
    var left = Math.min.apply(null, arr);
    var right = Math.max.apply(null, arr);
    var numArr = [];
 
    for (var i = left; i <= right; i++) {
        numArr.push(i);
    }
 
    return numArr.reduce(function(prev, next) {
        return prev + next;
    })
}





















