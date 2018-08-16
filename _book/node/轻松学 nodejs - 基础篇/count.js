var counter = (arr) => {
  return `There are ${arr.length} elements in the array`;
}
var adder = (a, b) => {
  return `the sum of the two numbers is ${a+b}`
}
var pi = 3.1415

// module.exports.counter = counter;
// module.exports.adder = adder;
// module.exports.pi = pi;

// module.exports = {
//   counter: counter,
//   adder: adder,
//   pi: pi,
// }

module.exports = {
  counter,
  adder,
  pi,
}


