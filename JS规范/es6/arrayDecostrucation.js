let [x,y,z] = new Set(['a','b','c']);
console.log(y);

let {bar,foo} = {foo:"aa",bar:"bb"};
console.log(foo);
console.log(bar);

const node = {
	loc:{
		start:{
			line:1,
			column:5
		}
	}
};

let {loc,loc:{start},loc:{start:{line}}} = node;
console.log(loc);
console.log(start);
console.log(line);

let t;
({t} = {t:1});


const [a,b,c,d,e] = 'hello';
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
