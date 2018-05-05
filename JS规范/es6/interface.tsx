//接口（Interface): 用来建立某种代码约定，只有定义没有实现
//使得其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定
interface IPerson {
	name: string
	age: number
}

class Person {
	//场景1：接口作为一个方法的参数类型声明，即用接口来声明一个属性
	constructor(public config: IPerson) {

	}
}
//多传或者少传一个属性，传的属性类型不对，都会报错，因为没有满足接口所约定的要求
var p1 = new Person({
	name: 'zhangsan',
	age: 18
})

//-------------------------------------------------------------------------------------------
// 场景2：用接口来声明一个方法
interface Animal {
	eat()
}
//所有实现接口的类必须实现接口锁定义的方法
class Sheep implements Animal {
	eat() {
		console.log('i eat grass')
	}
}
class Tiger implements Animal {
	eat () {
		console.log('i eat meat')
	}
}  
//imple用来声明某个类实现了某个接口 