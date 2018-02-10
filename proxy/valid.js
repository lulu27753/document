// 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
let valid = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }

        // 对于age以外的属性，直接保存
        obj[prop] = value;
    }
};

let person = new Proxy({}, valid);

console.log(person.age = 100);

console.log(person.age) // 100
console.log(person.age = 'young') // 报错
console.log(person.age = 300) // 报错