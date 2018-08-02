// Object.entries()
let obj = {
  one: 1,
  two: 2
};
for (let [k,v] of Object.entries(obj)) {
console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`); // "one": 1 ;"two" : 2
}
// Object.values()
console.log(Object.values({one: 1, two: 2})); // [ 1, 2 ]

