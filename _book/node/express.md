<!-- TOC -->

- [1. 快速创建应用骨架](#1-%E5%BF%AB%E9%80%9F%E5%88%9B%E5%BB%BA%E5%BA%94%E7%94%A8%E9%AA%A8%E6%9E%B6)
- [2. 路由（Routing)](#2-%E8%B7%AF%E7%94%B1%EF%BC%88routing)
- [3. express.static 中间件](#3-expressstatic-%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [4. 错误处理](#4-%08%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)
- [5. 错误处理器](#5-%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%E5%99%A8)
- [6. 响应方法](#6-%E5%93%8D%E5%BA%94%E6%96%B9%E6%B3%95)
- [7. 中间件](#7-%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [7.1. 应用级中间件](#71-%E5%BA%94%E7%94%A8%E7%BA%A7%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [7.2. 路由级中间件](#72-%E8%B7%AF%E7%94%B1%E7%BA%A7%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [7.3. 错误处理中间件](#73-%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [7.4. 内置中间件](#74-%E5%86%85%E7%BD%AE%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [7.5. 第三方中间件](#75-%E7%AC%AC%E4%B8%89%E6%96%B9%E4%B8%AD%E9%97%B4%E4%BB%B6)
- [8. 模板引擎](#8-%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E)
- [9. 参考资料](#9-%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)

<!-- /TOC -->
# 1. 快速创建应用骨架

```bash
npm install express-generator -g # 全局安装生成器工具
express -h # 列出所有可用的命令行
express [app_name] # 创建应用
cd [app_name] # 打开应用文件夹
npm install # 安装依赖包
DEBUG=myapp npm start # 启动应用（MacOS 或 Linux 平台）
set DEBUG=myapp & npm start # 启动应用（Windows 平台）
```

# 2. 路由（Routing)

+ URI（路径）+ HTTP 方法（GET、POST 等）
+ 每个路由都可以有一个(多个)处理器函数，当匹配到路由时，这个/些函数将被执行
> 路由定义：`app.METHOD(PATH, HANDLER);`<br />
`app` 是一个 express 实例；<br />
`METHOD` 是某个 HTTP 请求方式中的一个；<br />
`PATH` 是服务器端的路径；<br />
`HANDLER` 是当路由匹配到时需要执行的函数

```javascript
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
// 不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

# 3. express.static 中间件

```bash
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('public')); // 虚拟目录访问
```

> 访问静态资源文件时，会根据目录添加的顺序查找所需的文件

# 4. 错误处理

Express中404只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。
在其所有他中间件的后面添加一个处理 404 的中间件

```javascript
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

```

# 5. 错误处理器
 
```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

```

# 6. 响应方法

方法 | 描述
---|---
res.download() | 提示下载文件。
res.end() | 终结响应处理流程。
res.json() | 发送一个 JSON 格式的响应。
res.jsonp() | 发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect() | 重定向请求。
res.render() | 渲染视图模板。
res.send() | 发送各种类型的响应。
res.sendFile | 以八位字节流的形式发送文件。
res.sendStatus() | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

# 7. 中间件

中间件的功能包括：

+ 执行任何代码
+ 修改请求和响应对象
+ 终结请求-响应循环
+ 调用堆栈中的下一个中间件

## 7.1. 应用级中间件

绑定到 express应用实例

+ app.use()
+ app.METHOD()

## 7.2. 路由级中间件

绑定的对象为 express.Router()

+ router.use()
+ router.METHOD()

## 7.3. 错误处理中间件

(err, req, res, next)

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 7.4. 内置中间件

express.static(root, [options])
参数 root 指提供静态资源的根目录。

可选的 options 参数拥有如下属性:
属性	描述	类型	缺省值
dotfiles	是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	String	“ignore”
etag	是否启用 etag 生成	Boolean	true
extensions	设置文件扩展名备份选项	Array	[]
index	发送目录索引文件，设置为 false 禁用目录索引。	Mixed	“index.html”
lastModified	设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。	Boolean	true
maxAge	以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	Number	0
redirect	当路径为目录时，重定向至 “/”。	Boolean	true
setHeaders	设置 HTTP 头以提供文件的函数。	Function	 

## 7.5. 第三方中间件

# 8. 模板引擎

views, 放模板文件的目录，比如： app.set('views', './views')
view engine, 模板引擎，比如： app.set('view engine', 'jade')

$ npm install jade --save

# 9. 参考资料

[Express官网](http://www.expressjs.com.cn/)