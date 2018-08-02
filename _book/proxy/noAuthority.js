const target = Object.defineProperties({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false
    },
});

const handler = {
    get(target, propKey) {
        return 'abc';
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);
// TypeError: Invariant check failed