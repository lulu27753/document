//模块：可以帮助开发者将代码分割为可重用的单元
//开发者可以自己决定将模块中的哪些资源（类、方法、变量）暴露出去供外部使用，
// 哪些资源只在模块内使用
export var prop1;
var prop2;
export function func1() {}
function func2() {}
export class Clazz1 {}
export class Clazz2 {}

//注解(annotation)：注解为程序的元素（类、方法、变量）加上更直观的更明了的说明，
//这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用
//@加上注解名，如angular2中使用的@Component

//类型定义文件（*.d.ts):
//类型定义文件用来帮助开发者在TS中使用已有的JS工具包，如：JQuery
//DefinitelyTyped项目中包含了常用的JS包类型定义文件
//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
//工具：typings:https://github.com/typings/typings 用来安装类型定义文件的