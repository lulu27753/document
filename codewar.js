// 1.
// Given: an array containing hashes of names
// Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.
function list(names){
	if (names.length > 1) {
	 const list = names.map((name, index)=> {
	   return name.name
	 })
	 list.join(',')
	 console.log(list);
	 return list
	} else {
		const name = names[0] ? name = names[0].name : ''
		return name
	}
}
list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
// returns 'Bart, Lisa & Maggie'

// list([ {name: 'Bart'}, {name: 'Lisa'} ])
// returns 'Bart & Lisa'

// list([ {name: 'Bart'} ])
// returns 'Bart'

// list([])
// returns ''