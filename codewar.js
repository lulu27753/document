// 1.
// Given: an array containing hashes of names
// Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.
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
  return xs.length ? xs.join(", ") + " & " + x : x || ""
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
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 