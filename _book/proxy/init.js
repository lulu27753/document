var target = {
    name: '张三'

};
// var handler = {};
var handler = {
    get: function(target, property) {
        return 35;
    }
}
// var handler = {
//     get: function(target, property) {
//         if (property in target) {
//             return target[property];
//         } else {
//             throw new ReferenceError(property + "不存在")；
//         }
//     }
// }
var proxy = new Proxy(target, handler);

// var object = {
//     proxy: new Proxy(target, handler)
// };
console.log(proxy.name);
console.log(proxy.age);
console.log(target.name);
console.log(target.age);