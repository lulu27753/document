// [FreeCodeCamp中文社区](https: //www.freecodecamp.cn/)
// [Codewars](https: //www.codewars.com/kata/array-dot-diff/train/javascript)
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
  b.reduce((pre, cur, i) => {
			a.forEach(() => {
				a.indexOf(cur) !== -1 && a.splice(a.indexOf(cur), 1)
			})
	}, 0)
	return a
}
function array_diff(a, b) {
	return a.filter(function (x) {
		return b.indexOf(x) == -1;
	});
}
// console.log(array_diff([], [4,5], []), "a was [], b was [4,5], expected []");
// console.log(array_diff([3,4], [3]), "a was [3,4], b was [3], expected [4]");
// console.log(array_diff([1,8,2], [], [1,8,2]), "a was [1,8,2], b was [], expected [1,8,2]");
// console.log(array_diff([1,2,2,2,3],[2],[1,3]), "a was [1,2,2,2,3], b was [2], expected [1,3]");
// console.log(array_diff([1,2,2],[1],[2,2]), "a was [1,2,2], b was [1], expected [2,2]");

// 5.  Given two strings s1 and s2,
// we want to visualize how different the two strings are.
// We will only take into account the lowercase letters(a to z).
// First let us count the frequency of each lowercase letters in s1 and s2.
// s1 = "A aaaa bb c"
// s2 = "& aaa bbb c d"
// s1 has 4 'a', 2 'b', 1 'c'
// s2 has 3 'a', 3 'b', 1 'c', 1 'd'
// So the maximum for 'a' in s1 and s2 is 4 from s1;
// the maximum for 'b' is 3 from s2.
// In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.
// We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb"
// where 1 in 1: 
// aaaa stands for string s1 and aaaa because the maximum for a is 4. 
// In the same manner 2: bbb stands for string s2 and bbb because the maximum for b is 3.
// The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum
// if this maximum is strictly greater than 1;
// these letters will be prefixed by the number of the string where they appear with their maximum value and: .
// If the maximum is in s1 as well as in s2 the prefix is =: .
// In the result, substrings(a substring is
// 	for example 2: nnnnn or 1: hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order(letters and digits - more precisely sorted by codepoint);
// the different groups will be separated by '/'.See examples and "Example Tests".
function mix(s1, s2) {
	s1.split('')  
	s2.split('')
}
console.log(mix("Are they here", "yes, they are here"), "2:eeeee/2:yy/=:hh/=:rr")
console.log(mix("looping is fun but dangerous", "less dangerous than coding"), "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg")
console.log(mix(" In many languages", " there's a pair of functions"), "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt")
console.log(mix("Lords of the Fallen", "gamekult"), "1:ee/1:ll/1:oo")
console.log(mix("codewars", "codewars"), "")
console.log(mix("A generation must confront the looming ", "codewarrs"), "1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr")


