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