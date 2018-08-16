// 1.
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();// 相当于window.a()
// 2。
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
// 3.
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
window.o.fn();

// 4.this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //居然是window！！
        }
    }
}
var j = o.b.fn;
j();
// 5.构造函数版this：new关键字可以改变this的指向，将这个this指向实例对象
function Fn() {
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子

// 6. this碰到return
function fn() {  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

// 7.
function fn() {  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
// 8.
function fn() {  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
// 9.
function fn() {  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //追梦子
// 10.this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例
function fn() {  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a); //fn {user: "追梦子"}

// 11.
function fn() {  
    this.user = '追梦子';  
    return null;
}
var a = new fn;  
console.log(a.user); //追梦子

// 12.
function fn() {
    this.num = 1;
}
var a = new fn();
console.log(a.num); //1







