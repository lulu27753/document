## PWA

核心技术：
* App Manifest
* Service Worker
* Web Push
* Credential Management ApI


## 三个关键技术

### Service Worker (服务工厂)

解决离线的问题

* 离线缓存文件
* 是浏览器在后台独立于网页运行的脚本
* 作用于浏览器与服务器之间，相当于一个代理服务器
* 只能在 HTTPS 环境下使用

类似功能App Cache局限性：比较难在多页面应用中使用

#### 事件机制

* install
* activate
* message
* fetch
* sync
* push

#### 功能

* 后台数据的同步
* 从其他域获取资源请求
* 接受计算密集型数据的更新，多页面共享该数据
* 客户端编译与依赖管理
* 后端服务的hook机制
* 根据URL模式，自定义模版
* 性能优化
* 消息推送
* 定时默认更新
* 地理围栏

#### 生命周期

* Parsed （解析成功）
* Installing （正在安装）
* Installed | Waiting （安装成功|等待中）
* Activating （正在激活）
* Activated （激活成功）
* Redundant （废弃）
	* installing 事件失败
	* activating 事件失败
	* 新的 SW 替换其成为激活态 worker 

#### 依赖

* fetch
* promise
* CacheStorage: 存储 Cache 对象
* Cache: 存储Request | Response 对象

### Manifest（应用清单）

解决在桌面创建快捷方式的问题

* 基于 JSON 的 List
* 能够将你浏览的网页添加到你的手机屏幕上
* 在 Android 上能够全屏启动，不显示地址栏 （ 由于 Iphone 手机的浏览器是 Safari ，所以不支持哦）
* 控制屏幕 横屏 / 竖屏 展示
* 定义启动画面
* 可以设置你的应用启动是从主屏幕启动还是从 URL 启动
* 可以设置你添加屏幕上的应用程序图标、名字、图标大小


### Push Notification（推送通知）

* Push API：服务器端将更新的信息传递给 SW。即提供了让服务器能够向用户发送离线消息的能力，即使用户当前并没有打开你的页面，甚至没有打开浏览器。
* Notification API：SW 将更新的信息推送给用户。提供了开发者可以给用户发送通知的能力，包括申请显示通知权限，发起通知，以及定制通知的类型等。兼容性：IOS Safari 至今不支持


## Demo

### 环境

* 安装node && [Ngrok](https://blog.csdn.net/tomcat_2014/article/details/68944066)

* [Sunny-Ngrok内网转发](https://www.ngrok.cc/)


## tool

命令行工具：Lavas

## 资源

* [PWA-Book-CN: 第一本 PWA 中文书](https://github.com/SangKa/PWA-Book-CN)

* [sw-toolbox: A collection of service worker tools for offlining runtime requests](https://github.com/GoogleChromeLabs/sw-toolbox)

* [PWA 中文文档](http://sangka-z.com/PWA-Book-CN/)

* [LAVAS : 基于 Vue.js 的 PWA 解决方案](https://lavas.baidu.com/)































