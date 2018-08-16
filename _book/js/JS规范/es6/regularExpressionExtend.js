//两个参数都是字符串
var reg1 = new RegExp('\\bis\\b','g');
var str1 = "he is a boy.This is a dog";
str1 = str1.replace(reg1,'IS');
console.log(str1);

//参数是正则表达式
var reg2 = new RegExp(/\bis\b/g);
var str2 = "he is a boy.This is a dog";
str2 = str2.replace(reg2,'IS');
console.log(str2);

//第一个参数的正则表达式，第二个参数是字符串(这在ES5中的不允许的)
var reg3 = new RegExp(/\bis\b/,'g');
var str3 = "he is a boy.This is a dog";
str3 = str3.replace(reg3,'IS');
console.log(str3);

//正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。(ES5中不允许)
var reg4 = new RegExp(/\bis\b/gi,'g');
var str4 = "he is a boy.Is he?";
str4 = str4.replace(reg4,'0');
console.log(str4);

// /u
console.log(/^\uD83D/u.test('\uD83D\uDC2A'));

//点字符
var str5 = "\uD83D\uDC2A";
console.log(/^.$/.test(str5));
console.log(/^.$/u.test(str5));

//Unicode 字符表示法
console.log(/\u{61}/.test('a'));
console.log(/\u{61}/u.test('a'));

//量词
console.log(/\uD83D\uDC2A{2}/.test('\uD83D\uDC2A\uD83D\uDC2A'));
console.log(/\uD83D\uDC2A{2}/u.test('\uD83D\uDC2A\uD83D\uDC2A'));

//y修饰符
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

console.log(r1.exec(s));
console.log(r2.exec(s));

console.log(r1.exec(s));
console.log(r2.exec(s));

console.log('x##'.split(/#/y));
console.log('#x#'.split(/#/y));
console.log('##x'.split(/#/y));
console.log('###'.split(/#/y));

//doAll模式
console.log(/foo.bar/.test('foo\nbar'));
// console.log(/foo.bar/s.test('foo\nbar'));

//先行断言，先行否定断言与后行断言，后行否定断言
console.log(/\d+(?=%)/.exec('100% of us'));
console.log(/\d+(?!%)/.exec('100% of us'));

//分组
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
console.log(matchObj[1]); 
console.log(matchObj[2]); 
console.log(matchObj[3]); 
