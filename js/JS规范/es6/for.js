//不会显示数组绑定的属性desc，且不能中断
var array = [1,2,3,4]
array.desc = 'four number'
array.forEach(value => console.log(`forEach: ${value}`))

//数组的key值,元素和属性都会显示
for (var n in array) {
	// console.log(`for-in-key: ${n}`)
	console.log(`for-in-value: ${array[n]}`)
}
//数组的value值，忽略属性desc,可以break.
for (var value of array) {
	if (value > 2) {break}
	console.log(`for-of-array: ${value}`)
}
//可用在任何的集合上，Object\map\array\set,也可以用在字符串上
for (var value of "four number") {
	console.log(`for-of-string: ${value}`)
}