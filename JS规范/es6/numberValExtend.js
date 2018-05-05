
//二进制和八进制
var num2 = 0b110;
var num8 = 0o71;
console.log(num2);
console.log(num8);

//字符串转数字
var num2Str = '0b110';
var num8Str = '0o71';
console.log(Number(num2));
console.log(Number(num8));

console.log(Number.isFinite(NaN));

//Number.EPSILON
console.log(0.1+0.2 === 0.3);

//定义误差范围为2的-50次方
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
console.log(withinErrorMargin(0.1+0.2,0.3));

//Number.isSafeInteger()
console.log(Number.isSafeInteger(9007199254740993));

console.log(9007199254740993-990);

console.log(Math.sign(null));

console.log(Math.clz32('foo'));

console.log((0x7fffffff * 0x7fffffff)|0);
console.log(Math.imul((0x7fffffff , 0x7fffffff)));

console.log(Math.fround(NaN));

console.log(2 ** 2);