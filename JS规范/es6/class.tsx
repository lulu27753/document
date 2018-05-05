class Person {
	//在生成实例时，必须声明一个name
	//在构造函数中必须明确使用访问控制符，才能够被访问到
	//没有使用访问控制符，则没有声明name属性
	// constructor(name: string) {
	constructor(public name: string) {
		this.name = name
		console.log('im father constructor')
	}
	public name
	public eat() {
		console.log('im eating')
	}
}
//extends声明一种继承的关系，拥有父类的所有属性和方法
//子类可以声明自己的属性和方法
class Employee extends Person {
	//子类的构造函数必须得调用父类的构造函数
	//子类通过super调用父类的构造函数
	constructor(name: string, code: string) {
		super(name)
		this.code = code
		console.log('im child constructor')
	}
	code: string
	//通过super调用父类的方法
	work() {
		super.eat()
		this.doWork()
	}
	//private声明的私有方法不能被实例直接调用
	private doWork () {
		console.log('im working')
	}
}
var p1 = new Person('batman')
pa.eat()

var p2 = new Person('superman')
p2.eat()

var e1 = new Employee('employee', '1')
e1.eat()

//泛型（generic）：参数化的类型，一般用来限制集合的内容
var workers: Array<Person> = [];
workers[0] = new Person('zhangsan')
workers[1] = new Employee('lisi', "2")
// workers[2] = 2 //会报错，因为声明了泛型，数组里面放Person类型的数据

