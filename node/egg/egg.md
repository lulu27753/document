# egg

* 奉行“约定优于配置”
* 提供基于 Egg 定制上层框架的能力
* 高度可扩展的插件机制
* 内置多进程管理
* 基于 Koa 开发，性能优异
* 框架稳定，测试覆盖率高
* 渐进式开发


## koa

### Middleware

所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑

- [compress](https://github.com/koajs/compress/blob/master/index.js)

### Context

作为这次请求的上下文对象，可以将一次请求相关的上下文都挂载到这个对象上，同时 Context 上也挂载了 Request 和 Response 两个对象

get request.query
get request.hostname
set response.body
set response.status

### egg 继承于 koa

`app/extend/{application,context,request,response}.js`


## 插件


一个插件可以包含

- extend：扩展基础对象的上下文，提供各种工具类、属性。
- middleware：增加一个或多个中间件，提供请求的前置、后置处理逻辑。
- config：配置各个环境下插件自身的默认配置项。


- [onerror | egg | 统一异常处理](https://github.com/eggjs/egg-onerror)

- [watcher | egg | 文件和文件夹监控](https://github.com/eggjs/egg-watcher)

- [egg-development | egg | 开发环境配置](https://github.com/eggjs/egg-development)

- [egg-logrotator | egg | 日志切分](https://github.com/eggjs/egg-logrotator)

- [egg-schedule | egg | 定时任务](https://github.com/eggjs/egg-schedule)

- [egg-static | egg | 静态服务器](https://github.com/eggjs/egg-static)

- [Nunjucks](https://mozilla.github.io/nunjucks/)

- [egg-mysql | egg](https://github.com/eggjs/egg-mysql)

- [session | koa | Session 实现](https://github.com/koajs/session)

- [bodyparser | koa | body解析](https://github.com/koajs/bodyparser)

- [egg-security | egg | 安全](https://github.com/eggjs/egg-security)

- [egg-sequelize | ggg](https://github.com/eggjs/egg-sequelize)

- [multipart plugin | egg | 获取用户上传的流式文件](https://github.com/eggjs/egg-multipart)

- [validate plugin | egg](https://github.com/eggjs/egg-validate)

- [parameter | 参数校验](https://github.com/node-modules/parameter#rule)

- [egg-jsonp | egg | jsonp 支持](https://github.com/eggjs/egg-jsonp)

- [egg-view | 模板引擎](https://github.com/eggjs/egg-view)

- [egg-plugin | 更多插件](https://github.com/topics/egg-plugin)



## 渐进式开发

- 一般来说，当应用中有可能会复用到的代码时，直接放到 lib/plugin 目录去，如例子中的 egg-ua。
- 当该插件功能稳定后，即可独立出来作为一个 node module 。
- 如此以往，应用中相对复用性较强的代码都会逐渐独立为单独的插件。
- 当你的应用逐渐进化到针对某类业务场景的解决方案时，将其抽象为独立的 framework 进行发布。
- 当在新项目中抽象出的插件，下沉集成到框架后，其他项目只需要简单的重新 npm install 下就可以使用上，对整个团队的效率有极大的提升。

## 目录结构

```
egg-project
├── package.json
├── app.js (可选) // 自定义启动时的初始化工作
├── agent.js (可选) // 自定义启动时的初始化工作
├── app
|   ├── router.js // 用于配置 URL 路由规则
│   ├── controller // 用于解析用户的输入，处理后返回相应的结果
│   |   └── home.js
│   ├── service (可选) // 用于编写业务逻辑层
│   |   └── user.js
│   ├── middleware (可选) // 用于编写中间件
│   |   └── response_time.js
│   ├── schedule (可选) // 用于定时任务
│   |   └── my_task.js 
│	  ├── model (可选) // 用于放置领域模型
│   |   └── model.js
│   ├── public (可选) // 用于放置静态资源
│   |   └── reset.css
│   ├── view (可选) // 用于放置模板文件
│   |   └── home.tpl 
│   └── extend (可选) // 用于框架的扩展
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js // 用于配置需要加载的插件
|   ├── config.default.js // 用于编写配置文件
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test // 用于单元测试
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

## 内置基础对象

### Application

 - 几乎所有被框架 Loader 加载的文件（Controller，Service，Schedule 等），都可以 export 一个函数，这个函数会被 Loader 调用，并使用 app 作为参数

 - 在 Context 对象上，可以通过 ctx.app 访问到 Application 对象

 - 在继承于 Controller, Service 基类的实例中，可以通过 this.app 访问到 Application 对象


### Context

在每一次收到用户请求时，框架会实例化一个 Context 对象，这个对象封装了这次用户请求的信息，并提供了许多便捷的方法来获取请求参数或者设置响应信息。框架会将所有的 Service 挂载到 Context 实例上，一些插件也会将一些其他的方法和对象挂载到它上面

实例获取
- 是在 Middleware, Controller 以及 Service 中
- 在有些非用户请求的场景下我们需要访问 service / model 等 Context 实例上的对象，通过 Application.createAnonymousContext() 方法创建一个匿名 Context 实例
- 在定时任务中的每一个 task 都接受一个 Context 实例作为参数（app/schedule）


### Request && Response

在 Context 的实例上获取到当前请求的 Request(ctx.request) 和 Response(ctx.response) 实例

### Controller &&  Service

基类属性：
- ctx - 当前请求的 Context 实例。
- app - 应用的 Application 实例。
- config - 应用的配置。
- service - 应用所有的 service。
- logger - 为当前 controller 封装的 logger 对象。


基类获取
- 从 egg 上获取（推荐）
- 从 app 实例上获取

### Helper

有和 Controller 基类一样的属性

在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例


### Config

- 通过 app.config 从 Application 实例上获取到 config 对象
- 也可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象。


### Logger

 Logger 对象
- App Logger
- App CoreLogger
- Context Logger
- Context CoreLogger
- Controller Logger & Service Logger

每一个 logger 对象都提供了 4 个级别的方法：
- logger.debug()
- logger.info()
- logger.warn()
- logger.error()

### Subscription

从 egg 上获取基类

## 运行环境

### 指定运行环境

- 通过 `config/env` 文件指定，该文件的内容就是运行环境，如 prod。一般通过构建工具来生成这个文件。
- 通过 `EGG_SERVER_ENV` 环境变量指定

### 应用内获取运行环境

`app.config.env`

| NODE_ENV | EGG_SERVER_ENV | 说明 |
| --- | --- | --- |
|  | local | 本地开发环境 |
| test | unittest | 单元测试 |
| production | prod | 生产环境 |


### 自定义环境

要为开发流程增加集成测试环境 SIT。将 EGG_SERVER_ENV 设置成 sit（并建议设置 NODE_ENV = production），启动时会加载 config/config.sit.js，运行环境变量 app.config.env 会被设置成 sit。

## Config 配置

配置的管理有3种方案：
- 平台管理配置，应用构建时将当前环境的配置放到包内，启动时指定该配置。但应用就无法一次构建多次部署，而且本地开发环境想使用配置会变得很麻烦
- 平台管理配置，在启动时将当前环境的配置通过环境变量传入，这是比较优雅的方式，但框架对运维的要求会比较高，需要部署平台支持，同时开发环境也有相同痛点
- 使用代码管理配置，在代码中添加多个环境的配置，在启动时传入当前环境的参数即可。但无法全局配置，必须修改代码



egg 采用的是最后一种配置方案

| appInfo | 说明 |
| --- | --- |
| pkg | package.json |
| name | 应用名，同 pkg.name |
| baseDir | 应用代码的目录 |
| HOME | 用户目录，如 admin 账户为 /home/admin |
| root | 应用根目录，只有在 local 和 unittest 环境下为 baseDir，其他都为 HOME。 |





配置加载顺序(应用 > 框架 > 插件),后加载的会覆盖前面的同名配置
```
-> 插件 config.default.js
-> 框架 config.default.js
-> 应用 config.default.js
-> 插件 config.prod.js
-> 框架 config.prod.js
-> 应用 config.prod.js
```

配置结果：
框架在启动时会把合并后的最终配置 dump 到 `run/application_config.json`（worker 进程）和 `run/agent_config.json`


配置文件中会隐藏一些字段，主要包括两类:

- 如密码、密钥等安全字段，这里可以通过 config.dump.ignore 配置，必须是 Set 类型，查看默认配置。
- 如函数、Buffer 等类型，JSON.stringify 后的内容特别大


还会生成 `run/application_config_meta.json`（worker 进程）和 `run/agent_config_meta.json`（agent 进程）文件，用来排查属性的来源，（agent 进程）中，

## Middleware 中间件

### 配置

基于洋葱圈模型

配置
需要 exports 一个普通的 function，接受两个参数：
- options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
- app: 当前应用 Application 的实例


### 使用中间件

- 在应用中使用中间件
- 在框架和插件中使用中间件
- router 中使用中间件

[middleware| 框架默认中间件](https://github.com/eggjs/egg/tree/master/app/middleware)

[Compress middleware | koa](https://github.com/koajs/compress)


通用配置

- enable：控制中间件是否开启。
- match：设置只有符合某些规则的请求才会经过这个中间件。
- ignore：设置符合某些规则的请求不经过这个中间件。
	- 字符串
	- 正则
	- 函数

## Router

> 通过 Router 将用户的请求基于 method 和 URL 分发到了对应的 Controller 上

定义包含5个部分

- verb - 用户触发动作，支持 get，post 等所有 HTTP 方法，后面会通过示例详细说明。
	- router.head - HEAD
	- router.options - OPTIONS
	- router.get - GET
	- router.put - PUT
	- router.post - POST
	- router.patch - PATCH
	- router.delete - DELETE
	- router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
	- router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。
- router-name 给路由设定一个别名，可以通过 Helper 提供的辅助函数 pathFor 和 urlFor 来生成 URL。(可选)
- path-match - 路由 URL 路径
- middleware1 - 在 Router 里面可以配置多个 Middleware。(可选)
- controller - 指定路由映射到的具体的 controller 上，controller 可以有两种写法：
	- `app.controller.user.fetch` - 直接指定一个具体的 controller
	- 'user.fetch' - 可以简写为字符串形式

## controller

 > Controller 负责解析用户的输入，处理后返回相应的结果

- 在 RESTful 接口中，Controller 接受用户的参数，从数据库中查找内容返回给用户或者将用户的请求更新到数据库中。
- 在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户。
- 在代理服务器中，Controller 将用户的请求转发到其他服务器上，并将其他服务器的处理结果返回给用户。

主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：
- 获取用户通过 HTTP 传递过来的请求参数。
- 校验、组装参数。
- 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
- 通过 HTTP 将结果响应给用户。

项目中的 Controller 类继承于 egg.Controller，会有下面5个属性挂在 this 上:

- this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
- this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
- this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
- this.config：应用运行时的配置项。
- this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置

### 获取 HTTP 请求参数

- `ctx.query`: 解析在 URL 中 ? 后面的部分

- `ctx.queries`: 所有的 key 如果有值，也一定会是数组类型

- `ctx.request.body`: Web 开发中数据传递最常用的两类格式分别是 JSON 和 Form, bodyParser 中间件来对这两类格式的请求 body 解析成 object

- `ctx.getFileStream()`：获取上传的文件流

- `ctx.headers`[ctx.header| ctx.request.headers | ctx.request.header]: 获取整个 header 对象

- `ctx.get(name)`[ctx.request.get(name)]: 获取请求 header 中的一个字段的值

- `ctx.host`: 优先读通过 config.hostHeaders 中配置的 header 的值，读不到时再尝试获取 host 这个 header 的值

- `ctx.protocol`: 首先会判断当前连接是否是加密连接，如果是加密连接，返回 https。如果处于非加密连接时，优先读通过 config.protocolHeaders 中配置的 header 的值来判断是 HTTP 还是 https，如果读取不到，我们可以在配置中通过 config.protocol 来设置兜底值，默认为 HTTP

- `ctx.ips`: 获取请求经过所有的中间设备 IP 地址列表，只有在 config.proxy = true 时，才会通过读取 config.ipHeaders 中配置的 header 的值来获取，获取不到时为空数组

- `ctx.ip`: 获取请求发起方的 IP 地址

- `ctx.cookies.get`: 获取cookie的值

- `ctx.cookies.set`: 设置cookie的值

- `ctx.session`: 访问或者修改当前用户 Session

- `ctx.validate(rule, [body])`: 对参数进行校验, 校验异常422

- `app.validator.addRule(type, check)`: 新增自定义校验规则

- `ctx.service`: 调用 Service

- `ctx.status`: 设置状态码

- `ctx.response.body`[ctx.body]: 响应发送 body

- `ctx.render(template)`: 渲染模板生成 html

- `ctx.set(key, value)`: 设置一个响应头

- `ctx.set(headers)`: 设置多个 Header

- `ctx.redirect(url)`: 如果不在配置的白名单域名内，则禁止跳转;若用户没有配置 domainWhiteList 或者 domainWhiteList数组内为空，则默认会对所有跳转请求放行，即等同于ctx.unsafeRedirect(url)

- `ctx.unsafeRedirect(url)`: 不判断域名，直接跳转，一般不建议使用，明确了解可能带来的风险后使用


#### bodyParser内置插件

 bodyParser:
- 当请求的 Content-Type 为 `application/json`，`application/json-patch+json`，`application/vnd.api+json` 和 `application/csp-report` 时，会按照 json 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 当请求的 Content-Type 为 `application/x-www-form-urlencoded` 时，会按照 form 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 如果解析成功，body 一定会是一个 Object（可能是一个数组）。


- `413`: 用户的请求 body 超过了我们配置的解析最大长度
- `400`: 用户的请求 body 超过了我们配置的解析最大长度



#### Multipart 内置插件

通过 ctx.getFileStream() 接口能获取到上传的文件流
- 只支持上传一个文件
- 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields

为了保证文件上传的安全，框架限制了支持的的文件格式。可以通过在 config/config.default.js 中配置来新增支持的文件扩展名，或者重写整个白名单

当传递了 whitelist 属性时，fileExtensions 属性不生效


#### 设置body

`ctx.response.body`[ctx.body]: 响应发送 body

在响应中发送的 body，也需要有配套的 Content-Type 告知客户端如何对数据进行解析：

- 作为一个 RESTful 的 API 接口 controller，我们通常会返回 Content-Type 为 application/json 格式的 body，内容是一个 JSON 字符串。
- 作为一个 html 页面的 controller，我们通常会返回 Content-Type 为 text/html 格式的 body，内容是 html 代码段。

#### JSONP 配置

在 config/config.default.js 全局覆盖默认的配置

```
// config/config.default.js
exports.jsonp = {
  callback: 'callback', // 识别 query 中的 `callback` 参数
  limit: 100, // 函数名最长为 100 个字符
};
```

app.jsonp()中间件

```
// app/router.js
module.exports = app => {
  const { router, controller, jsonp } = app;
  router.get('/api/posts/:id', jsonp({ callback: 'callback' }), controller.posts.show);
  router.get('/api/posts', jsonp({ callback: 'cb' }), controller.posts.list);
};

```

## Service

在复杂业务场景下用于做业务逻辑封装的一个抽象层,提供这个抽象有以下几个好处:
- 保持 Controller 中的逻辑更加简洁。
- 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用
- 将逻辑和展现分离，更容易编写测试用例

### 使用场景

- 复杂数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后，更新到数据库。
- 第三方服务的调用，比如 GitHub 信息获取等

### Service ctx

- `this.ctx.curl`: 发起网络调用
- `this.ctx.service.otherService`: 调用其他 Service
- `this.ctx.db`: 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块


## Subscription(定时任务)

app/schedule

使用场景：
- 定时上报应用状态。
- 定时从远程接口更新本地缓存。
- 定时进行文件切割、临时文件删除。


## 第三方库

- [co | 处理异步](https://github.com/tj/co)

## 资源

- [跨域](https://github.com/eggjs/egg/issues/725)

- [Sequelize Docs 中文版](https://demopark.github.io/sequelize-docs-Zh-CN/)

- [Sequelize 使用 - 简书](https://www.jianshu.com/p/32f0fb0d7700)