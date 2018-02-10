# 随心随想随笔

pwa是优化web app，
rn|weex|react native是用web栈搞native的事

PWA:
渐进式：能确保每个用户都能打开网页
响应式：PC，手机，平板，不管哪种格式，网页格式都能完美适配
离线应用：支持用户在没网的条件下也能打开网页，这里就需要 Service Worker 的帮助
APP 化：能够像 APP 一样和用户进行交互常
更新：一旦 Web 网页有什么改动，都能立即在用户端体现出来
安全：安全第一，给自己的网站加上一把绿锁--HTTPS
可搜索：能够被引擎搜索到推送：做到在不打开网页的前提下，推送新的消息
可安装：能够将Web像APP一样添加到桌面可跳转：只要通过一个连接就可以跳转到你的 Web 页面

Web要做的是把组件化、离线缓存、本地API、通知接口、自适应设备做好
service worker强大的网络请求拦截可以帮助用户更好的原生APP体验。PWA存在的问题主要是浏览器的兼容问题
service worker，pouchdb对离线体验的加持，以上几个库都没polymer做得好。

乔布斯：Design is not just what it looks like and feels like. Design is how it works