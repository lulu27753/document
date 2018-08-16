var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Proxy 实例作为其他对象的原型对象
let obj = Object.create(proxy);
console.log(obj.time); // 35