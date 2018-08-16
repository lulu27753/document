var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});

console.log(proxy.time) // 35
console.log(proxy.name) // 35
console.log(proxy.title) // 35