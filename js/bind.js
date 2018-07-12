// 1. 手动实现bind()
Function.prototype.testBind = function (that) {
  console.log(this)
  var _this = this
  console.log(_this)

  // 由于参数的不确定性，统一用arguments来处理，
  // arguments只是一个类数组对象，有length属性，但是没有slice方法，所以借用Array原型的slice方法
  // 用数组的slice()将类数组转化成标准格式数组：当slice()没有输入参数的时候，会创建一个新数组，然后把当前数组的所有元素扔进去，最后返回这个新数组
  // 除了作用域对象that外，后面的所有参数都需要作为数组参数传递
  slice = Array.prototype.slice
  args = slice.apply(arguments, [1]);

  return function () {
    // apply绑定作用域，进行参数传递
    return _this.apply(that,
      args.concat(Array.prototype.slice.apply(arguments, [0])))
  }
}

var test = function (a, b) {
  console.log('作用域绑定 ' + this.value)
  console.log('testBind参数传递 ' + a.value2)
  console.log('调用参数传递 ' + b)
}
var obj = {
  value: 'ok'
}
var fun_new = test.testBind(obj, {
  value2: 'also ok'
})

fun_new('hello bind')

// 2.原型对象的this值指向调用它的对象b，既不指向prototype，也不指向a
function a() {};
a.prototype.testThis = function () {
  console.log(a.prototype == this);
};
var b = new a();
b.testThis(); // false

// 3.将类数组转换成数组
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}

var arr1 = [].slice.call(arrayLike)

let arr2 = Array.from(arrayLike)

console.log(arr1, arr2)
