/*{
	let a = 10;
	var b = 1;
}
console.log(b);*/

var a = [];
for(var i=0;i<10;i++){
	a[i] = function(){
		console.log(i);
	};
}
a[6]();

var a = [];
for(let i=0;i<10;i++){
	a[i] = function(){
		console.log(i);
	};
}
a[6]();

// for(let i=0;i<10;i++){
// 	let i =10;
// 	console.log(i);
// }

// for(let i=0;i<10;i++){
// 	var i =10;
// }
// typeof c;


// function f() { console.log('I am outside!'); }

// (function () {
//   if (false) {
//     // 重复声明一次函数f
//     function f() { console.log('I am inside!'); }
//   }

//   f();
// }());

function g(){
	return 3;
}

{
  let t = g();
  t = t * t + 1;

}

// let x = do {
//   let t = g();
//   t * t + 1;
// };
//  console.log(x);

 const PI;