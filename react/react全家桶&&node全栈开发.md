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

## antd-mobile

安装：`npm i antd-mobile --save`

## redux

状态少的时候，状态的变更都是通过setState
状态逐渐复杂，则需要根据类别分开管理

赵政委的主要能力：
* 老赵有一个保险箱(store)，所有人的状态，在那里都有记录(state)
* 需要改变的时候，需要告诉专员(dispatch)要干什么(action)
* 处理变化的人(reducer)拿到state和action，生成新的state

步骤：
* 首先通过reducer新建store，随时可以通过store.getState获取状态
* 需要状态变更时，store.dispatch(action)来修改状态
* Reducer()接受state和action，返回新的state，可以用store.subscribe监听每次修改
* 当有多个reducer时，需要通过redux提供的combineReducers()合并成单个reducer

## Redux如何和React一起用（手动链接）

* 把store.dispatch()传递给组件，内部可以调用修改状态
* subscribe订阅render(),每次修改都重新渲染
* Redux相关内容，移到单独的文件index.redux.js单独管理

## 优化——组件解耦

将action对象通过`props`传入到子组件中，带来的弊端是会`store`需要一层一层的往下传递，陷入组件传递的陷阱,解决方案就是用第三方插件`react-redux`。

## 处理异步

* Redux默认至处理同步，异步任务需要`redux-thunk`插件
  * `npm i redux-thunk --save`
  * 使用`applyMiddleware`开启`thunk`中间件(redux的中间件机制)
  * `action`可以返回函数，使用`dispatch`提交`action`
* `npm install redux-devtools-extention` 并且开启
* 使用`react-redux`优雅的链接react和redux

## 调试工具：chrome 中的redux插件安装

* 新建`store`的时候判断`window.devToolsExtension`
* 使用`compose`结合`thunk`和`window.devToolsExtension`（`compose`是对几个函数进行组合）
* 调试窗的`redux`选项卡，实时看到`state`

## 更优雅的和react结合：react-redux

* `npm i react-redux --save`
* 忘记`subscribe`,记住`reducer`,`action`,`dispatch`即可
* `react-redux`提供`provider` 和 `connect`两个接口来连接

* Provider组件在应用的最外层，传入store即可，只用一次
* connect负责从外部获取组件需要的参数，第一个参数你要state的什么属性放到props里，第二个参数你要什么方法，放到props里，会自动dispatch
* connect可以用装饰器的方式来写

所有的数据都是外部给进来的，通过props传输的组件就叫做木偶组件

## 使用装饰器优化connect代码

* 安装支持装饰器的插件：`npm i babel-plugin-transform-decorators-legacy --save-dev`
* 在package.json中添加babel的plugin配置

## redux后续进阶

* 什么数据应该放在React里面
* Redux管理ajax
* redux管理聊天数据

## React-router4

* 4是全新的版本，和之前的版本不兼容，浏览器和RN均兼容
* React开发单页应用必备，践行路由即组件的概念
* 核心概念：动态路由 | Route | Link | Switch

* `npm i react-router-dom --save`
* BrowserRouter包裹整个应用,只使用一次
* Route路由对应渲染的组件，可嵌套.精确匹配添加参数exact
* Link跳转专用
* url参数，Route组件参数可用冒号标识参数
* Redirect组件跳转
* Switch只渲染命中的第一个子Route组件

## 文件架构和规范

* src前端源码目录
* server后端express目录
* 功能文件夹：component | container | reducers等

### router页面怎么划分

* 进入应用时获取用户信息，用户未登录跳转login页面
* login和register页面不需要权限认证
* 用户信息 | 聊天列表 | 职位列表 页面共享底部的tabbar

### 其他注意事项

* mongodb字段的设计
* axios发送异步请求
* redux管理所有数据，组件尽量用antd-mobile，弱化css

## 前后端数据联调

* 使用axios发送异步请求
  * 如何发送，react应用和server应用端口不一致，使用proxy配置转发，解决跨域的问题
  * axios拦截器，统一loading处理
