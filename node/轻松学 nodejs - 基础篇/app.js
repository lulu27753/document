// // 一、普通函数

// function sayHi() {
//   console.log('Hi!');
// }
// sayHi();
// // 函数表达式
// var sayBye = function() {
//   console.log('Bye!');
// }
// sayBye();

// // 二、回调函数原理

// function callFunction(fun, name) {
//   fun(name);
// }
// var sayBye = (name) => {
//   console.log(`${name}, Bye!`);
// }
// callFunction(sayBye, 'lulu')

// // 三、模块

// var stuff = require('./count.js');
// console.log(stuff.counter(['nodejs', 'arr', 'lulu']));
// console.log(stuff.adder(2,3));
// console.log(stuff.pi);

// // 四、事件
// // 案例一
// var events = require('events');// 导入事件核心库
// var myEmiter = new events.EventEmitter();// 新建一个事件对象
// myEmiter.on('someEvent', function(message) {
//   console.log(message);
// })// 绑定事件并监听，触发事件时会执行回调函数

// myEmiter.emit('someEvent', 'the event was emitted!')// 手动触发事件

// // 案例二
// var events = require('events');// 导入事件核心库
// var util = require('util')// 导入工具库
// var Person = function(name) {
//   this.name = name;
// }// 新建一个构造函数
// util.inherits(Person, events.EventEmitter) // Person继承events.EventEmitter，从而拥有绑定事件的能力
// var lulu = new Person('lulu')// 新建一个对象实例
// var lili = new Person('lili') // 新建一个对象实例
// var xiaoming = new Person('xiaoming') // 新建一个对象实例
// var persons = [lulu, lili, xiaoming]// 将三个对象实例放入数组中
// persons.forEach((person) => {
//   person.on('speak', function(message) {
//     console.log(`${person.name} say ${message}`);
//   })
// })// 给每个对象绑定一个speak事件

// // 触发事件
// lulu.emit('speak', 'I\'m lulu')
// lili.emit('speak', 'I\'m lili')
// xiaoming.emit('speak', 'I\'m xiaoming')

// // 五、读写文件
// // 1.同步
// const fs = require('fs');// 导入文件系统库
// var readmeOne = fs.readFileSync('./readme.txt','utf8')// 同步读取文件
// console.log(readmeOne);// 将文件内容输出到控制台
// console.log('Finished!');

// fs.writeFileSync('writeme.txt', readmeOne)// 同步写入文件

// 2.异步
// const fs = require('fs'); // 导入文件系统库
// var readmeOne = fs.readFile('./readme.txt', 'utf8', function(err, data) {
//   console.log(data);
// })// 异步读取文件
// console.log('Finished!');

// // 六、创建和删除目录
// // 1.删除文件
// const fs = require('fs');
// fs.unlink('writeme.txt', () => {
//   console.log('writeme.txt has been deleted!');
// })// 异步删除文件

// // 2.创建目录
// const fs = require('fs');
// fs.mkdir('stuff', () => {
//   console.log('stuff has been created!');
  
// })

// // 3.删除目录
// const fs = require('fs');
// fs.rmdir('stuff', () => {
//   console.log('stuff has been removed!');

// })

// // 4.综合案例
// const fs = require('fs')
// fs.mkdir('stuff', () => {
//   fs.readFile('readme.txt', 'utf8', (err, data) => {
//     fs.writeFile('./stuff/readme.txt', data, () => {
//       console.log('readme.txt has been copied to ./stuff');      
//     })
//   })
// })

// // 六、流和管道

// // 1.读取流
// const fs = require('fs')// 导入文件模块
// const myReadStream = fs.createReadStream(`${__dirname}/readMe.txt`, 'utf8')// 将读取的文件放入到输入流中
// myReadStream.setEncoding('utf8');
// var data = '';
// myReadStream.on('data', (chunk) => {
//   data += chunk;
// })// 监听接收数据事件
// myReadStream.on('end', () => {
//   console.log(data);
// })// 监听接收完数据的事件

// // 2.写入流
// const fs = require('fs');// 导入文件模块
// const writeData = 'Hello World!';
// const myReadStream = fs.createReadStream(`${__dirname}/readme.txt`)
// const myWriteStream = fs.createWriteStream(`${__dirname}/writeMe.txt`)

// myWriteStream.write(writeData);
// myWriteStream.end();
// myWriteStream.on('finish', () => {
//   console.log('finished!');
// });
// myReadStream.setEncoding('utf8');

// // 3.管道方式写入流
// const fs = require('fs');// 导入文件模块
// const myReadStream = fs.createReadStream(`${__dirname}/readme.txt`)
// const myWriteStream = fs.createWriteStream(`${__dirname}/writeMe.txt`)
// myReadStream.pipe(myWriteStream);

// // 4.压缩
// const crypto = require('crypto');
// const fs = require('fs');
// const zlib = require('zlib');

// const password = new Buffer(process.env.PASS || 'password');
// const encryptStream = crypto.createCipher('aes-256-cbc', password);
// const gzip = zlib.createGzip();
// const readStream = fs.createReadStream(`${__dirname}/readme.txt`);// 当前的文件
// const writeStream = fs.createWriteStream(`${__dirname}/out.gz`);
// readStream // 读取当前文件
//   .pipe(encryptStream)// 编码
//   .pipe(gzip)// 压缩
//   .pipe(writeStream)// 输出文件
//   .on('finish', () => {
//     console.log('done');
//   })// 全部操作完成后

// // // 5.解压
// const crypto = require('crypto')
// const fs = require('fs')
// const zlib = require('zlib')
// const password = new Buffer(process.env.PASS || 'password')
// const decryptStream = crypto.createDecipher('aes-256-cbc', password)
// const gzip = zlib.createGunzip();
// const readStream = fs.createReadStream(`${__dirname}/out.gz`);

// readStream
//   .pipe(gzip)
//   .pipe(decryptStream)
//   .pipe(process.stdout)
//   .on('finish', () => {
//     console.log('done');
//   })







