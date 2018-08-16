[微信小程序接入指南 · 小程序](https://developers.weixin.qq.com/miniprogram/introduction/)

## 目录结构

* .json 后缀的 JSON 配置文件
    * app.json：对当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等
        * pages字段 —— 用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。
        * window字段 —— 小程序所有页面的顶部背景颜色，文字颜色定义在这里的。
    * project.config.json：开发者工具的个性化配置
    * pages/logs/logs.json（page.json）：独立定义每个页面的一些属性
* .wxml 后缀的 WXML 模板文件：类似 HTML
    * wx: 开头的属性
    * 数据绑定{{}}
* .wxss 后缀的 WXSS 样式文件：
    * 尺寸单位:rpx
    * 全局样式:app.wxss
    * 局部样式 page.wxss
    * 仅支持部分 CSS 选择器
* .js 后缀的 JS 脚本逻辑文件
    * API:获取用户信息、本地存储、微信支付等
    * setData

## 配置

### app.json

属性 | 类型 | 必填 | 描述
---|----|----|---
pages | String Array | 是 | 设置页面路径
window | Object | 否 | 设置默认页面的窗口表现
tabBar | Object | 否 | 设置底部 tab 的表现
networkTimeout | Object | 否 | 设置网络超时时间
debug | Boolean | 否 | 设置是否开启 debug 模式

1、pages

* 数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改。
* 文件名不需要写文件后缀，因为框架会自动去寻找路径下 .json, .js, .wxml, .wxss 四个文件进行整合

2、window

属性 | 类型 | 默认值 | 描述 | 最低版本
---|----|-----|----|-----
navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000" | 
navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white | 
navigationBarTitleText | String |  | 导航栏标题文字内容 | 
navigationStyle | String | default | 导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮 | 微信版本 6.6.0
backgroundColor | HexColor | #ffffff | 窗口的背景色 | 
backgroundTextStyle | String | dark | 下拉背景字体、loading 图的样式，仅支持 dark/light | 
backgroundColorTop | String | #ffffff | 顶部窗口的背景色，仅 iOS 支持 | 微信版本 6.5.16
backgroundColorBottom | String | #ffffff | 底部窗口的背景色，仅 iOS 支持 | 微信版本 6.5.16
enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见页面相关事件处理函数 | 
onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px

3、tabBar

属性 | 类型 | 必填 | 默认值 | 描述
---|----|----|-----|---
color | HexColor | 是 |  | tab 上的文字默认颜色
selectedColor | HexColor | 是 |  | tab 上的文字选中时的颜色
backgroundColor | HexColor | 是 |  | tab 的背景色
borderStyle | String | 否 | black | tabbar上边框的颜色， 仅支持 black/white
list | Array | 是 |  | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
position | String | 否 | bottom | 可选值 bottom、top

 list 

 属性 | 类型 | 必填 | 说明
----|----|----|---
pagePath | String | 是 | 页面路径，必须在 pages 中先定义
text | String | 是 | tab 上按钮文字
iconPath | String | 否 | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
selectedIconPath | String | 否 | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效

4、networkTimeout

属性 | 类型 | 必填 | 说明
---|----|----|---
request | Number | 否 | wx.request的超时时间，单位毫秒，默认为：60000
connectSocket | Number | 否 | wx.connectSocket的超时时间，单位毫秒，默认为：60000
uploadFile | Number | 否 | wx.uploadFile的超时时间，单位毫秒，默认为：60000
downloadFile | Number | 否 | wx.downloadFile的超时时间，单位毫秒，默认为：60000

### page.json

属性 | 类型 | 默认值 | 描述
---|----|-----|---
navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000"
navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white
navigationBarTitleText | String |  | 导航栏标题文字内容
backgroundColor | HexColor | #ffffff | 窗口的背景色
backgroundTextStyle | String | dark | 下拉背景字体、loading 图的样式，仅支持 dark/light
enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见页面相关事件处理函数。
disableScroll | Boolean | false | 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项
onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px

## 逻辑层(App Service)

### App()

* App() 必须在 app.js 中注册，且不能注册多个。
* 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
* 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
* 通过 getApp() 获取实例之后，不要私自调用生命周期函数。

属性 | 类型 | 描述 | 触发时机
---|----|----|-----
onLaunch | Function | 生命周期函数--监听小程序初始化 | 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
onShow | Function | 生命周期函数--监听小程序显示 | 当小程序启动，或从后台进入前台显示，会触发 onShow
onHide | Function | 生命周期函数--监听小程序隐藏 | 当小程序从前台进入后台，会触发 onHide
onError | Function | 错误监听函数 | 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
其他 | Any |  | 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

### Page()

属性 | 类型 | 描述
---|----|---
data | Object | 页面的初始数据
onLoad | Function | 生命周期函数--监听页面加载
onReady | Function | 生命周期函数--监听页面初次渲染完成
onShow | Function | 生命周期函数--监听页面显示
onHide | Function | 生命周期函数--监听页面隐藏
onUnload | Function | 生命周期函数--监听页面卸载
onPullDownRefresh | Function | 页面相关事件处理函数--监听用户下拉动作
onReachBottom | Function | 页面上拉触底事件的处理函数
onShareAppMessage | Function | 用户点击右上角转发
onPageScroll | Function | 页面滚动触发事件的处理函数
onTabItemTap | Function | 当前是 tab 页时，点击 tab 时触发
其他 | Any | 开发者可以添加任意的函数或数据到 object 参数中，在页面的函数中用 this 可以访问

## 资源

微信小程序图表插件（wx-charts）
[awesome-wechat-weapp: 微信小程序开发资源汇总](https://github.com/justjavac/awesome-wechat-weapp)


## 搭建HTTP服务器

### 安装NodeJS 和 NPM

```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install nodejs -y
node -v
```

### 编写HTTP源码

1、准备工作

```bash
mkdir -p /data/release/weapp # 创建工作目录
cd /data/release/weapp # 进入工作目录
```

2、在工作目录创建package.json

```json
{
    "name": "weapp",
    "version": "1.0.0"
}
```

3、在工作目录添加Server源码

```javascript
// app.js
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');

// 创建一个 express 实例
const app = express();

// 实现唯一的一个中间件，对于所有请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);
```

### 运行HTTP服务

1. 安装`PM2`及`Express`

```bash
npm install pm2 --global
cd /data/release/weapp # 进入工作目录
npm install express --save
```

2. 启动服务

```bash
cd /data/release/weapp # 进入工作目录
pm2 start app.js
pm2 logs # 查看服务输出的日志
pm2 restart app # 重启服务

```

```bash
pm2 start app.js -i max # -i参数目的是指定运行多少个实例，在这个例子中 PM2 使用了一个常量max来扩展你的app运转到你最大的核数，不要忘记Node 平时只会运行在单核!
```

3. 关闭服务

```bash
pm2 status
pm2 stop [id]
pm2 delete [id]
```

## 搭建HTTPS服务

微信小程序要求和服务器的通信都通过HTTPS进行

1、安装Nginx

```bash
yum install nginx -y # 安装
nginx # 启动服务
```

访问 http://193.112.152.100 可以看到 Nginx 的测试页面

2、配置HTTPS反向代理

外网用户访问服务器的 Web 服务由 Nginx 提供，Nginx 需要配置反向代理才能使得 Web 服务转发到本地的 Node 服务。
先将之前下载的 SSL 证书(解压后 Nginx 目录分别以 crt 和 key 作为后缀的文件)通过拖动到左侧文件浏览器/etc/nginx目录的方式来上传文件到服务器上
Nginx 配置目录在 /etc/nginx/conf.d，我们在该目录创建 ssl.conf

```bash
# ssl.conf
server {
        listen 443;
        server_name www.example.com; # 改为绑定证书的域名
        # ssl 配置
        ssl on;
        ssl_certificate 1_www.example.com_bundle.crt; # 改为自己申请得到的 crt 文件的名称
        ssl_certificate_key 2_www.example.com.key; # 改为自己申请得到的 key 文件的名称
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
            proxy_pass http://127.0.0.1:8765;
        }
    }
```

```bash
nginx -s reload # 让 Nginx 重新加载配置使其生效
```

在浏览器通过 https 的方式访问你解析的域名来测试 HTTPS 是否成功启动

3、在微信小程序中测试HTTPS访问

```javascript
//app.js
App({
    config: {
        host: 'mp.techird.cn' // 填写域名
    },
    onLaunch () {
        console.log('App.onLaunch()');
    }
});
```

## 小程序会话

小程序不支持Cookie存储和跟踪，服务器需要自行实现会话层

1、安装并启动MongoDB

```bash
yum install mongodb-server mongodb -y # 安装MongoDB及其客户端命令行工具
mongod --version
mongo --version
mkdir -p /data/mongodb # 创建存储MongoDB数据的目录
mkdir -p /data/logs/mongodb # 创建存储日志的目录
mongod --fork --dbpath /data/mongodb --logpath /data/logs/mongodb/weapp.log # 启动MongoDB
netstat -ltp | grep 27017 # 检查MongoDB是否启动成功
```

2、添加MongoDB用户

```bash
mongo # 登录本地MongoDB
use weapp;
db.createUser({ user: 'weapp', pwd: 'weapp-dev', roles: ['dbAdmin', 'readWrite']});
```

3、实现小程序的会话功能

```bash
cd /data/release/weapp
npm install connect-mongo wafer-node-session --save
```

在工作目录创建用于保存服务所用的配置的配置文件config.js

```javascript
// config.js
module.exports = { 
    serverPort: '8765', 

    // 小程序 appId 和 appSecret 
    // 请到 https://mp.weixin.qq.com 获取 AppID 和 AppSecret
    appId: 'YORU_APP_ID', // 替换成自己的AppID
    appSecret: 'YOUR_APP_SECRET', // 替换成自己的AppSecret

    // mongodb 连接配置，生产环境请使用更复杂的用户名密码
    mongoHost: '127.0.0.1', 
    mongoPort: '27017', 
    mongoUser: 'weapp', 
    mongoPass: 'weapp-dev', 
    mongoDb: 'weapp'
};
```

编辑app.js:添加会话实现逻辑

```javascript
// app.js:添加会话实现逻辑
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session'); 
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession); 
// 引入配置文件
const config = require('./config'); 

// 创建一个 express 实例
const app = express();

// 添加会话中间件，登录地址是 /login
app.use(waferSession({
    appId: config.appId,
    appSecret: config.appSecret,
    loginPath: '/login',
    store: new MongoStore({
        url: `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`
    })
})); 
// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => {
    response.json(request.session ? request.session.userInfo : { noBody: true });
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
}); 

// 实现一个中间件，对于未处理的请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 监听端口，等待连接
app.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
```

```bash
pm2 restart app #重启服务
```

## WebSocket服务

1、安装Node模块

```bash
cd /data/release/weapp
npm install ws --save #使用 ws 模块来在服务器上支持 WebSocket 协议
```

2、实现WebSocket服务器

实现WebSocket服务

```javascript
// websocket.js
// 引入 ws 支持 WebSocket 的实现
const ws = require('ws');

// 导出处理方法
exports.listen = listen;

/**
 * 在 HTTP Server 上处理 WebSocket 请求
 * @param {http.Server} server
 * @param {wafer.SessionMiddleware} sessionMiddleware
 */
function listen(server, sessionMiddleware) {
    // 使用 HTTP Server 创建 WebSocket 服务，使用 path 参数指定需要升级为 WebSocket 的路径
    const wss = new ws.Server({ server, path: '/ws' });

    // 监听 WebSocket 连接建立
    wss.on('connection', (ws,request) => {// 要升级到 WebSocket 协议的 HTTP 连接

        // 被升级到 WebSocket 的请求不会被 express 处理，
        // 需要使用会话中间节获取会话
        sessionMiddleware(request, null, () => {
            const session = request.session;
            if (!session) {
                // 没有获取到会话，强制断开 WebSocket 连接
                ws.send(JSON.stringify(request.sessionError) || "No session avaliable");
                ws.close();
                return;
            }
            // 保留这个日志的输出可让实验室能检查到当前步骤是否完成
            console.log(`WebSocket client connected with openId=${session.userInfo.openId}`);
            serveMessage(ws, session.userInfo);
        });
    });

    // 监听 WebSocket 服务的错误
    wss.on('error', (err) => {
        console.log(err);
    });
}

/**
 * 进行简单的 WebSocket 服务，对于客户端发来的所有消息都回复回去
 */
function serveMessage(ws, userInfo) {
    // 监听客户端发来的消息
    ws.on('message', (message) => {
        console.log(`WebSocket received: ${message}`);
        ws.send(`Server: Received(${message})`);
    });

    // 监听关闭事件
    ws.on('close', (code, message) => {
        console.log(`WebSocket client closed (code: ${code}, message: ${message || 'none'})`);
    });

    // 连接后马上发送 hello 消息给会话对应的用户
    ws.send(`Server: 恭喜，${userInfo.nickName}`);
}

```

调用WebSocket服务

```javascript
// app.js
// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http'); 
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session'); 
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession); 
// 引入配置文件
const config = require('./config'); 
// 引入 WebSocket 服务实现
const websocket = require('./websocket');

// 创建一个 express 实例
const app = express();

// 独立出会话中间件给 express 和 ws 使用
const sessionMiddleware = waferSession({
    appId: config.appId,
    appSecret: config.appSecret,
    loginPath: '/login',
    store: new MongoStore({
        url: `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`
    })
});
app.use(sessionMiddleware);

// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => { 
    response.json(request.session ? request.session.userInfo : { noBody: true }); 
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
}); 

// 实现一个中间件，对于未处理的请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 创建 HTTP Server 而不是直接使用 express 监听
const server = http.createServer(app);

// 让 WebSocket 服务在创建的 HTTP 服务器上监听
websocket.listen(server, sessionMiddleware);

// 启动 HTTP 服务
server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
```

```bash
pm2 restart app # 重启服务
```

3、更新Nginx代理，添加WebSocket支持

```bash
# WebSocket 配置
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
        listen 443;
        server_name www.example.com; # 改为绑定证书的域名
        # ssl 配置
        ssl on;
        ssl_certificate 1_www.example.com.crt; # 改为自己申请得到的 crt 文件的名称
        ssl_certificate_key 2_www.example.com.key; # 改为自己申请得到的 key 文件的名称
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        # WebSocket 配置
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        location / {
            proxy_pass http://127.0.0.1:8765;
        }
    }
```

```bash
nginx -s reload # 重启nginx
```

# 接收消息和事件

* 客服会话按钮 
    * `<button open-type="contact" />`
    * [表单组件 · button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
* 微信服务器将消息打包成（JSON或者XML格式）POST请求
    * 开发者可以在48小时内调用客服接口
    * 用户发送消息允许的动作列表：下发条数达到上限后，会收到错误返回码
        * 用户通过客服消息按钮进入会话 | 1条 | 1分钟
        * 用户发送信息 | 5条 | 48小时
    * 客服接口调用请求(POST | HTTPS):`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN`
        * access_token：调用接口凭证
        * 返回码说明
            参数 | 说明
            ---|---
            -1 | 系统繁忙，此时请开发者稍候再试
            0 | 请求成功
            40001 | 获取 access_token 时 AppSecret 错误，或者 access_token 无效。请开发者认真比对 AppSecret 的正确性，或查看是否正在为恰当的小程序调用接口
            40002 | 不合法的凭证类型
            40003 | 不合法的 OpenID，请开发者确认OpenID否是其他小程序的 OpenID
            45015 | 回复时间超过限制
            45047 | 客服接口下行条数超过上限
            48001 | api功能未授权，请确认小程序已获得该接口
* 微信服务器在5S内收不到相应会断掉连接，并且重新发起请求，重试3次
* 重试消息排重：
    * msgid:使用msgid排重
    * 事件类型消息：FromUserName + CreateTime排重
* 服务器收到请求
    * 直接回复success（推荐方式）
    * 直接回复空串（指字节长度为0的空字符串，而不是结构体中content字段的内容为空)
* 小程序客服暂时无法提供服务
    * 开发者在5S内未回复任何内容
    * 开发者回复了异常数据
* [消息加密](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318479&token=&lang=zh_CN)

* 文本消息

1、用户发送消息 2、客服发送消息

```json
    {
    "MsgType": "text", // text,消息类型
    "Content": "this is a test", // 文本消息内容

    "ToUserName": "toUser", // 小程序的原始ID
    "FromUserName": "fromUser", // 发送者的openid
    "CreateTime": 1482048670, // 消息创建时间(整型)
    "MsgId": 1234567890123456 // 消息id，64位整型
    }
```

```json
{
    "touser": "OPENID", // 普通用户(openid)
    "msgtype": "text", // 消息类型
    "text": { "content":"Hello World"} // 文本消息内容
}
```


* 图片消息

```json
{
    "MsgType": "image", // image,消息类型
    "PicUrl": "this is a url", // 图片链接(由系统生成)
    "MediaId": "media_id", // 图片消息媒体id，可以调用获取临时素材接口拉取数据

    "ToUserName": "toUser", // 小程序的原始ID
    "FromUserName": "fromUser", // 发送者的openid
    "CreateTime": 1482048670, // 消息创建时间(整型)
    "MsgId": 1234567890123456 // 消息id，64位整型
}
```

```json

{
    "touser":"OPENID",
    "msgtype":"image",
    "image":{
        "media_id":"MEDIA_ID" // 发送的图片的媒体ID，通过新增素材接口上传图片文件获得
        }
}

```

// 特别的图文链接

```json
{

    "touser": "OPENID",
    "msgtype": "link",
    "link": {
          "title": "Happy Day", // 消息标题
          "description": "Is Really A Happy Day", // 图文链接消息
          "url": "URL", // 图文链接消息被点击后跳转的链接
          "thumb_url": "THUMB_URL" // 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
    }
}

```

* 小程序卡片消息

```json
{
    "MsgType": "miniprogrampage", // miniprogrampage，消息类型
    "AppId":"appid", // 小程序appid
    "ThumbUrl":"", // 封面图片的临时cdn链接
    "ThumbMediaId":"", // 封面图片的临时素材id
    "Title":"title", // 标题
    "PagePath":"path", // 小程序页面路径

    "ToUserName": "toUser", // 小程序的原始ID
    "FromUserName": "fromUser", // 发送者的openid
    "CreateTime": 1482048670, // 消息创建时间(整型）
    "MsgId": 1234567890123456 // 消息id，64位整型
}
```

```json
{
    "touser":"OPENID",
    "msgtype":"miniprogrampage",
    "miniprogrampage":{
        "title":"title",
        "pagepath":"pagepath", // 小程序的页面路径，跟app.json对齐，支持参数，比如pages/index/index?foo=bar
        "thumb_media_id":"thumb_media_id" // 小程序消息卡片的封面， image类型的media_id，通过新增素材接口上传图片文件获得，建议大小为520*416
    }
}

```

* 进入会话事件

```json
{
    "MsgType": "event", // event,消息类型
    "Event": "user_enter_tempsession", // 事件类型，user_enter_tempsession
    "SessionFrom": "sessionFrom", // 开发者在客服会话按钮设置的session-from属性

    "ToUserName": "toUser", // 小程序的原始ID
    "FromUserName": "fromUser", // 发送者的openid
    "CreateTime": 1482048670 // 事件创建时间(整型）
}
```

## 临时素材

使用该接口下载客服消息内的临时多媒体文件
* 接口调用:curl -I -G "https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID"
    * GET | HTTPS
    * `https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID`
        * access_token:调用接口凭证
        * media_id:媒体文件ID

## APP项目运行

* `cd server && npm install`
* 腾讯云——上传测试代码——模块上传——部署后自动安装依赖
* 获取腾讯云自动分配的开发环境域名配置到client/config.js
* 
