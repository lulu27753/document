<!-- TOC -->

- [环境安装及配置](#%E7%8E%AF%E5%A2%83%E5%AE%89%E8%A3%85%E5%8F%8A%E9%85%8D%E7%BD%AE)
- [全局对象](#%E5%85%A8%E5%B1%80%E5%AF%B9%E8%B1%A1)
- [回调函数](#%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)
- [模块](#%E6%A8%A1%E5%9D%97)
- [事件](#%E4%BA%8B%E4%BB%B6)
- [读写文件](#%E8%AF%BB%E5%86%99%E6%96%87%E4%BB%B6)
- [创建和删除目录](#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%88%A0%E9%99%A4%E7%9B%AE%E5%BD%95)
- [流和管道](#%E6%B5%81%E5%92%8C%E7%AE%A1%E9%81%93)
- [包管理器(NPM)](#%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8npm)
- [nodemon](#nodemon)
- [异步定时器](#%E5%BC%82%E6%AD%A5%E5%AE%9A%E6%97%B6%E5%99%A8)
- [事件循环(Event Loop)](#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AFevent-loop)
  - [理解Event Loop](#%E7%90%86%E8%A7%A3event-loop)
  - [事件循环的六个阶段](#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E7%9A%84%E5%85%AD%E4%B8%AA%E9%98%B6%E6%AE%B5)
  - [setTimeout 和 setImmediate](#settimeout-%E5%92%8C-setimmediate)
- [](#)

<!-- /TOC -->

# 环境安装及配置

[nodejs](https://nodejs.org/en/)
[vs code](https://code.visualstudio.com/)

插件：
Terminal

# 全局对象

无需导入，在哪里都可以直接调用，类似于浏览器中的windows对象。

[node全局对象](https://nodejs.org/dist/latest-v9.x/docs/api/globals.html)

```JavaScript
console.log('hello world');

setTimeout(() => {
  console.log('3s have been passed!');
}, 3000);

var time = 0
var timer = setInterval(() => {
  time += 2;
  console.log(`${time} have been passed!`);
  if (time > 5) {
    clearInterval(timer)
  }
}, 2000);

console.log(__dirname);// 输出当前目录
console.log(__filename);// 输出当前文件
```

# 回调函数

```javascript
function callFunction(fun, name) {
  fun(name);
}
var sayBye = (name) => {
  console.log(`${name}, Bye!`);
}
callFunction(sayBye, 'lulu')
```

# 模块

一个文件即一个模块

```javascript
// count.js
var counter = (arr) => {
  return `There are ${arr.length} elements in the array`;
}
var adder = (a, b) => {
  return `the sum of the two numbers is ${a+b}`
}
var pi = 3.1415

// module.exports.counter = counter;
// module.exports.adder = adder;
// module.exports.pi = pi;

// module.exports = {
//   counter: counter,
//   adder: adder,
//   pi: pi,
// }

module.exports = {
  counter,
  adder,
  pi,
}
```

```javascript
// app.js
var stuff = require('./count.js');
console.log(stuff.counter(['nodejs', 'arr', 'lulu']));
console.log(stuff.adder(2,3));
console.log(stuff.pi);
```

# 事件

> nodejs是事件驱动的

+ [Events对象](https://nodejs.org/dist/latest-v9.x/docs/api/events.html)

+ [Util对象](https://nodejs.org/dist/latest-v9.x/docs/api/util.html)

```javascript
var events = require('events');// 导入事件核心库
var myEmiter = new events.EventEmitter();// 新建一个事件对象
myEmiter.on('someEvent', function(message) {
  console.log(message);
})// 绑定事件并监听，触发事件时会执行回调函数

myEmiter.emit('someEvent', 'the event was emitted!')// 手动触发事件

```

```javascript
var events = require('events');// 导入事件核心库
var util = require('util')// 导入工具库
var Person = function(name) {
  this.name = name;
}// 新建一个构造函数
util.inherits(Person, events.EventEmitter) // Person继承events.EventEmitter，从而拥有绑定事件的能力
var lulu = new Person('lulu')// 新建一个对象实例
var lili = new Person('lili') // 新建一个对象实例
var xiaoming = new Person('xiaoming') // 新建一个对象实例
var persons = [lulu, lili, xiaoming]// 将三个对象实例放入数组中
persons.forEach((person) => {
  person.on('speak', function(message) {
    console.log(`${person.name} say ${message}`);
  })
})// 给每个对象绑定一个speak事件

// 触发事件
lulu.emit('speak', 'I\'m lulu')
lili.emit('speak', 'I\'m lili')
xiaoming.emit('speak', 'I\'m xiaoming')
```

# 读写文件

[File System](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html#fs_fs_write_fd_string_position_encoding_callback)

同步：从头到尾按照顺序一步一步执行，不管前面一个动作耗费多长时间，都必须等前一个动作完成才会继续执行后一个动作。

```javascript
const fs = require('fs');// 导入文件系统库
var readmeOne = fs.readFileSync('./readme.txt','utf8')// 同步读取文件
console.log(readmeOne);// 将文件内容输出到控制台
console.log('Finished!');

fs.writeFileSync('writeme.txt', readmeOne)// 同步写入文件
```

异步：nodejs在执行JavaScript的时候是单线程的，但是nodejs不是单线程的。当执行数据库连接等操作时会很耗费时间，就会导致阻塞，通过异步的方式解决。nodejs维护了一个事件队列，执行异步操作时，首先在事件队列中注册一个事件，但是回调函数并没有马上执行，继续执行后续操作，当主线程空闲后，就会去找事件队列里的事件，把它取出来，再从线程池中发起一个线程，等执行完成之后，再告诉主线程异步操作已经成功了。即异步操作开启另一个线程来执行耗时的IO操作，从而避免主线程阻塞的情况出现。凡是异步操作，均需要回调函数。

```javascript
const fs = require('fs'); // 导入文件系统库
var readmeOne = fs.readFile('./readme.txt', 'utf8', function(err, data) {
  console.log(data);
})// 异步读取文件
console.log('Finished!');
```

# 创建和删除目录

1.删除文件

```javascript
const fs = require('fs');
fs.unlink('writeme.txt', () => {
  console.log('writeme.txt has been deleted!');
})// 异步删除文件
```

2.创建目录

```javascript
const fs = require('fs');
fs.mkdir('stuff', () => {
  console.log('stuff has been created!');
  
})

```

3.删除目录

```javascript
const fs = require('fs');
fs.rmdir('stuff', () => {
  console.log('stuff has been removed!');

})
```

4.综合案例

```javascript
const fs = require('fs')
fs.mkdir('stuff', () => {
  fs.readFile('readme.txt', 'utf8', (err, data) => {
    fs.writeFile('./stuff/readme.txt', data, () => {
      console.log('readme.txt has been copied to ./stuff');
    })
  })
})

```

# 流和管道

[stream](https://nodejs.org/dist/latest-v9.x/docs/api/stream.html)

流：一个命令的输出作为另一个命令的输入；所有的流都是EventEmitter的实例；nodejs中对于http的处理也是一种流，请求是输入的流，响应是输出的流。流的应用：1.数据处理2.提高性能（将较大的文件放入到buffer中）
buffer是分段处理的

1.读取流
```javascript
const fs = require('fs')// 导入文件模块
const myReadStream = fs.createReadStream(`${__dirname}/readMe.txt`, 'utf8')// 将读取的文件放入到输入流中
myReadStream.setEncoding('utf8');
var data = '';
myReadStream.on('data', (chunk) => {
  data += chunk;
})// 监听接收数据事件
myReadStream.on('end', () => {
  console.log(data);
})// 监听接收完数据的事件

```

2.写入流

```javascript
const fs = require('fs');// 导入文件模块
const writeData = 'Hello World!';
const myReadStream = fs.createReadStream(`${__dirname}/readme.txt`)
const myWriteStream = fs.createWriteStream(`${__dirname}/writeMe.txt`)

myWriteStream.write(writeData);
myWriteStream.end();
myWriteStream.on('finish', () => {
  console.log('finished!');
});
myReadStream.setEncoding('utf8');

```

3.管道方式写入流

```javascript
const fs = require('fs');// 导入文件模块
const myReadStream = fs.createReadStream(`${__dirname}/readme.txt`)
const myWriteStream = fs.createWriteStream(`${__dirname}/writeMe.txt`)
myReadStream.pipe(myWriteStream);

```

4.压缩

```javascript
const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const password = new Buffer(process.env.PASS || 'password');
const encryptStream = crypto.createCipher('aes-256-cbc', password);
const gzip = zlib.createGzip();
const readStream = fs.createReadStream(`${__dirname}/readme.txt`);// 当前的文件
const writeStream = fs.createWriteStream(`${__dirname}/out.gz`);
readStream // 读取当前文件
  .pipe(encryptStream)// 编码
  .pipe(gzip)// 压缩
  .pipe(writeStream)// 输出文件
  .on('finish', () => {
    console.log('done');
  })// 全部操作完成后

```

5.解压

```javascript
const crypto = require('crypto')
const fs = require('fs')
const zlib = require('zlib')
const password = new Buffer(process.env.PASS || 'password')
const decryptStream = crypto.createDecipher('aes-256-cbc', password)
const gzip = zlib.createGunzip();
const readStream = fs.createReadStream(`${__dirname}/out.gz`);

readStream
  .pipe(gzip)
  .pipe(decryptStream)
  .pipe(process.stdout)
  .on('finish', () => {
    console.log('done');
  })
```

# 包管理器(NPM)

[node_modules](http://node-modules.com)

[npms](https://npms.io)

[npm官网](https://www.npmjs.com/)

[淘宝镜像](https://npm.taobao.org/)

[安装 node-sass的正确姿势](https://github.com/lmk123/blog/issues/28)

[手动切换](https://github.com/Pana/nrm)

[yarn教程](https://www.rails365.net/articles/cong-npm-dao-quan-mian-yong-bao-yarn)

# nodemon

开发环境使用，会监控代码的改变，服务器会自动重启

1.安装：`sudo npm i -g nodemon`
2.用nodemon代替node命令即可

# 异步定时器

+ setTimeout()
+ setInterval()
+ setImmediate()
+ process.nextTick():nextTickQueue是所有异步任务里面最快执行的

同步任务总是比异步任务更早执行
本轮循环一定早于次轮循环执行

process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。
setTimeout | setInterval | setImmediate 的回调函数，追加在次轮循环

微任务(microTaskQueue)：Promise对象的回调函数会进入异步任务里面的“微任务”队列

# 事件循环(Event Loop)

Node官网这样介绍
> “When Node.js starts, it initializes the event loop, processes the provided input script which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.”

## 理解Event Loop

1、只有一个主线程，事件循环是在主线程上完成的
2、Node开始执行脚本时先进行事件循环的初始化
3、然后执行：

+ 同步任务
+ 发出异步请求
+ 规划定时器生效的时间(libuv)
+ 执行process.nextTick()等等

4、执行事件循环

## 事件循环的六个阶段

事件循环会无限次地执行，一轮又一轮。只有异步任务的回调函数队列清空了，才会停止执行。每一轮的事件循环，分成六个阶段，这些阶段会依次执行：

+ timers(定时器阶段)：处理setTimeout()和setInterval()的回调函数。进入这个阶段后，主线程会检查一下当前时间，是否满足定时器的条件。如果满足就执行回调函数，否则就离开这个阶段。
+ I/O callbacks：除了以下操作的回调函数，其他的回调函数都在这个阶段执行
  + setTimeout() | setInterval | setImmediate 的回调函数
  + 用于关闭请求的回调函数，比如socket.on('close',...)
+ idle, prepare:该阶段只供libuv内部调用
+ poll：轮询时间，用于等待还未返回的I/O事件，比如服务器的回应、用户移动鼠标等。这个阶段的时间会比较长。如果没有其他异步任务要处理(比如到期的定时器)，会一直停留在这个阶段，等待I/O请求返回结果。
+ check:执行setImmediate()的回调函数
+ close callbacks：执行关闭请求的回调函数，比如socket.on('close',...)

每个阶段都有一个先进先出的回调函数队列，只有一个阶段的回调函数队列清空了，该执行的回调函数都执行了，事件循环才会进入下一个阶段。
![event-loop-levels](../assets/event-loop-levels.webp)
![event-loop](../assets/event-loop.webp)

案例：

```javascript
const fs = require('fs');
const timeoutScheduled = Date.now();
// 异步任务一：100ms 后执行的定时器
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms`);
}, 100);
// 异步任务二：至少需要 200ms 的文件读取
fs.readFile('test.js', () => {
  const startCallback = Date.now();
  while (Date.now() - startCallback < 200) {
    // 什么也不做
  }
});
```

脚本进入第一轮事件循环以后，没有到期的定时器，也没有已经可以执行的 I/O 回调函数，所以会进入 Poll 阶段，等待内核返回文件读取的结果。由于读取小文件一般不会超过 100ms，所以在定时器到期之前，Poll 阶段就会得到结果，因此就会继续往下执行。

第二轮事件循环，依然没有到期的定时器，但是已经有了可以执行的 I/O 回调函数，所以会进入 I/O callbacks 阶段，执行fs.readFile的回调函数。这个回调函数需要 200ms，也就是说，在它执行到一半的时候，100ms 的定时器就会到期。但是，必须等到这个回调函数执行完，才会离开这个阶段。

第三轮事件循环，已经有了到期的定时器，所以会在 timers 阶段执行定时器。最后输出结果大概是200多毫秒。

## setTimeout 和 setImmediate

由于setTimeout在 timers 阶段执行，而setImmediate在 check 阶段执行。所以，setTimeout会早于setImmediate完成。

```javascript
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
```
上面代码应该先输出1，再输出2，但是实际执行的时候，结果却是不确定，有时还会先输出2，再输出1。

这是因为setTimeout的第二个参数默认为0。但是实际上，Node 做不到0毫秒，最少也需要1毫秒，根据官方文档，第二个参数的取值范围在1毫秒到2147483647毫秒之间。也就是说，setTimeout(f, 0)等同于setTimeout(f, 1)。

实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数。

但是，下面的代码一定是先输出2，再输出1。

```javascript
const fs = require('fs');
fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
```

上面代码会先进入 I/O callbacks 阶段，然后是 check 阶段，最后才是 timers 阶段。因此，setImmediate才会早于setTimeout执行。

# 