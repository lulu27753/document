let a = "\u{7A}";
console.log(a);

for(let codePoint of 'foo'){
	console.log(codePoint);
}

console.log(String.fromCodePoint(0x20BB7));
console.log(String.fromCodePoint(0x78,0x1f680,0x79));