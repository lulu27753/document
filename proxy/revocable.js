let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
console.log(proxy.foo) // 123

revoke();
console.log(proxy.foo) // TypeError: Revoked