// 1.
// Given: an array containing hashes of names
// Return: a string formatted as a list of names separated by commas except for the last two names, 
// which should be separated by an ampersand.
function list(names){
	if (names.length > 1) {
	 const list = names.map((name, index)=> {
	   return name.name
	 })
	 list.slice(1)
	 const result1 = `${list.pop()}`
	 const result2 = `${list.pop()} & ${result1}`
	 const result = list.length >0 ? `${list.join(', ')}, ${result2}` : result2
	 return result
	} else if (names.length === 1) {
		return names[0].name
	} else {
		const name = names[0] ? name = names[0].name : ''
		return ''
	}
}

function list(names) {
  var xs = names.map(p => p.name)
  var x = xs.pop()
  return xs.length ? (xs.join(", ") + " & " + x): (x || "")
}
function list(names){
  return names
           .map((item) => item.name)
           .join(', ')
           .replace(/,\s([^,]+)$/, ' & $1');
}
// list([ {name: 'Bart'}, {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// returns 'Bart, Lisa & Maggie'

// console.log(list([ {name: 'Bart'}, {name: 'Lisa'} ]))
// returns 'Bart & Lisa'

// console.log(list([ {name: 'Bart'} ]))
// returns 'Bart'

// console.log(list([]))
// returns ''
// 2. You probably know the "like" system from Facebook and other pages. 
// People can "like" blog posts, pictures or other items. 
// We want to create the text that should be displayed next to such an item.

// Implement a function likes :: [String] -> String, 
// which must take in input array, containing the names of people who like an item. 
// It must return the display text as shown in the examples:
function likes(names) {
  function list(names) {
	  var x = names.pop()
	  var xs = names.length > 2 && [...names.slice(0,2)]
	  return xs ? `${xs.join(", ")} and ${names.length - 1} others like` : (names.length ? `${names.join(", ")} and ${x} like` : (x || "no one") + " likes")
	}
	
	return `${list(names)} this`
}

// console.log(likes([])) // must be "no one likes this"
// console.log(likes(["Peter"])) // must be "Peter likes this"
// console.log(likes(["Jacob", "Alex"])) // must be "Jacob and Alex like this"
// console.log(likes(["Max", "John", "Mark"])) // must be "Max, John and Mark like this"
// console.log(likes(["Alex", "Jacob", "Mark", "Max"])) // must be "Alex, Jacob and 2 others like this"
// console.log(likes(["Alex", "Jacob", "Mark", "Max", "Alex", "Jacob", "Mark", "Max"])) // must be "Alex, Jacob and 2 others like this"
// 3.
// Write a function that takes an (unsigned) integer as input, 
// and returns the number of bits that are equal to one in the binary representation of that number.
// Example: The binary representation of 1234 is 10011010010, 
// so the function should return 5 in this case
var countBits = function(n) {
  return n.toString(2).split('').reduce((pre,cur,i) => parseInt(pre) + parseInt(cur), 0);
};
var countBits = n => n.toString(2).split('0').join('').length;
// console.log(countBits(0), 0);
// console.log(countBits(4), 1);
// console.log(countBits(7), 3);
// console.log(countBits(9), 2);
// console.log(countBits(10), 2);
// 4.Your goal in this kata is to implement a difference function, 
// which subtracts one list from another and returns the result.
// It should remove all values from list a, which are present in list b.

function array_diff(a, b) {
	console.log(a,b);
  b.reduce((pre, cur, i) => {
		return (cur)
  })
}
// console.log(array_diff([], [4,5], []), "a was [], b was [4,5], expected []");
console.log(array_diff([3,4], [3]), "a was [3,4], b was [3], expected [4]");
// console.log(array_diff([1,8,2], [], [1,8,2]), "a was [1,8,2], b was [], expected [1,8,2]");
// console.log(array_diff([1,2,2,2,3],[2],[1,3]), "a was [1,2,2,2,3], b was [2], expected [1,3]");






