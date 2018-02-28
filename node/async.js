setTimeout(() => console.log(1)); // 次轮循环
setImmediate(() => console.log(2)); // 次轮循环
process.nextTick(() => console.log(3)); // 本轮循环
Promise.resolve().then(() => console.log(4)); // 本轮循环
(() => console.log(5))();// 同步任务

