## 技术栈

前端页面：登录 | 完善信息 | 牛人列表 | BOSS列表 | 消息列表 | 聊天详情
前端支撑：antd-mobile | redux | react-router4 | axios | create-react=app | 第三方组件
后端支撑： Express | Socket.io | mangodb

## express

* app.get | app.post 分别开发get和post接口
* app.use使用模块
* res.send | res.json | res.sendfile 响应文本 | json | 文件

新建配置文件server.js

```javascript
const express = require('express');
c
// 新建app
const app = express()
app.get('/', function (req, res) {
  res.send('<h1>hello world</h1>');
})
app.get('/data', function (req, res) {
  res.json({name:'imoonmmsjjsjus',type:'IT'})
})
app.listen(9093, function () {
  console.log('Node app start at port 9093');
})
```

## Mongodb + mongoose

1、Mac下安装:`brew install mongodb`
2、创建数据库目录

```bash
data/
	conf	-->配置文件目录
		mongod.conf		-->配置文件
	db		-->数据库目录
	log		-->日志文件目录
		mongodb.log		-->日志记录文件
```

3、启动数据库
`mongod --config /usr/local/etc/mongod.conf`
新启动一个命令行工具：执行`“mongo“`,出现类似下图则表示安装成功
![mongodb](../assets/mongodb_success.png)

4、用node中的mongoose模块连接express和mongodb
`npm i mongoose --save`

在服务器配置文件server.js中配置：

```javascript
const mongoose = require('mongoose')
// 链接mongo,并且使用react这个集合(如果没有react集合，则会自动新建)
const DB_URL = `mongodb://127.0.0.1:27017/react`
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log(`mongo connect success`);
})
```
5、封装mongoose
Connect链接数据库
定义文档模型，Schema 和 model 新建模型

```javascript
// 类似于mysql的表，mongo里有文档、字段的概念
// 通过mongoose操作mongodb，存储的就是json，相对mysql来说，要易用很多
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type:Number, require: true}
}))
```
String,Number等数据结构
6、增删改查
create | remove | update 分别用来增 | 删 | 改 的操作
find | findOne（找到一条立即返回，剩下的不管） 用来查询数据

```javascript
// 新增数据
User.create({
  user: 'lulu',
  age: 18
}, function (err, doc) {
  if (!err) {
    console.log(doc);
  } else {
    console.log(err);
  }
})
```

```javascript
// 查找读取数据
app.get('/data', function (req, res) {
  // 查询所有的数据，传入一个空对象即可
  User.find({}, function (err, doc) {
    return res.json(doc);
  })
})
```

```javascript
// 删除数据
app.get('/delete', function (req, res) {
  User.remove({age: 18}, function (err, doc) {
    console.log(doc);// n:删除了几条数据；OK：是否删除成功
    User.find({}, function (err, doc) {
      return res.json(doc);
  })
  })
})
```

```javascript
// 更新数据
app.get('/update', function (req, res) {
  User.update({'user': 'xiaoming'}, {'$set': {age: 26}}, function (err, doc) {
    console.log(doc);
    User.find({}, function(err, doc) {
      return res.json(doc)
    })
  })
})
```

7、后续进阶
mongodb独立工具函数
express使用body-parse支持post参数
使用cookie-parser存储登录信息cookie