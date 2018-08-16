// //拓展符用在数组里
//  let array = [1, 2, 3, 4, 5]

//  function doSomething([n1, n2, ...oters]) {
//    console.log('数组')
//    console.log(n1)
//    console.log(n2)
//    console.log(oters)
//  }
//  doSomething(array);

//  let obj = {'n1':1, 'n2':2, 2:3, 3:4, 4:5}

//  function doSomething(n1, n2, ...oters) {
//    console.log('对象')
//    console.log(n1)
//    console.log(n2)
//    console.log(oters)
//  }
//  doSomething(obj);

// var  [first, ...rest] = [1, 2, 3, 4, 5];
// console.log(first)
// console.log(rest)
// console.log(typeof(rest));
// console.log(Array.isArray(rest))
const animation = {
	enter(node, done) {console.log('-1')},
	leave(node, done) {console.log('0')},
	appear(node, done) {return 1},
}
const defaultProps = {
		openAnimation: { ...animation, appear() {return 2} }
	};

// console.log(defaultProps.openAnimation)
// console.log(defaultProps.openAnimation.enter())
console.log(console.log('0'))
// console.log(defaultProps.openAnimation.appear())
// console.log('33333')