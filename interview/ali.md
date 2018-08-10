1、数组去重,你能想到几种实现方式，新特性怎么实现，纯原生怎么实现
* new Set()
* filter
2、谈谈函数式编程的思想

3、react-router4.0与前面几个版本的主要区别
* 基于高阶组件去实现的
* 子路由不再是需要放到根路由上去实现了，可以放到组件里面，形成一个完全的组件
4、react高阶函数，哪些场景会用到，react插件里面哪些会用到
*（提到connect,react-router4。。。)
5、immutable.js的原理，为什么要用，与自己实现浅拷贝有什么区别？说说深拷贝的实现原理
* 将react的UI层面性能发挥到极致，可以避免props 和 state 没有变化的子组件re-render
* 数据层面的性能优化可通过redux
6、webpack的配置是完全自己配置的么，谈谈你对webpack的理解，webpack和gulp的区别
* gulp:
	* 定位是Task Runner
	* 通过自动化解决问题
		* rm 掉 dist文件夹中以前的旧文件
		* 自动把sass编译成css, coffee编译成js
		* 压缩各自的文件，压缩图片，生成图片sprite
		* 拷贝minified/uglified 文件到 dist 文件夹
	* 遗留问题：js module 的问题，是你写代码时候如何组织代码结构的问题.
* webpack:
	* 一开始webpack是专门去做module dependency的事情（gulp 里面有个 gulp-webpack）
	* webpack有个plugins的选项，可以用来进一步处理经过loader 生成的bundle.js，于是有人写了对应的插件
	* npm/package.json 里面的scripts，可以替换gulp的命令组合
7、node层主要做一些什么工作
8、git的rebase命令和merge命令的区别，什么时候该用rebase，什么时候该用merge(提到去SourceTree的官网上更多的不同)
9、预处理器less | sass | stylus之间的区别
10、在用ant-design的组件时，有哪些不好用的地方，做了哪些改进
11、flex的使用：一个div里面有两个div，不管在什么情况下，都能让里面的子div实现置顶紧贴两边的边框的
12、持续集成，Jenkins的配置问题（。。。完全不知道怎么回答）
13、react的源码有看过吗，谈一下diff的思想
14、box-sizing有哪些属性，用于什么场景
* content-box
* border-box
* 最好在全局reset时便设置box-sizing：content-box，这样不会因为
15、browserRouter和HashRouter的区别，对于后端来说有什么不同
16、最近有了解什么新的技术吗？聊聊你对该技术的看法
* pwa 
* flutter
* transflow
17、自学，没有人带，你觉得哪些学习渠道对你的帮助比较大
* github
* 看书
* 视频教程
* 微信公众号
* 知乎、简书、掘金
* 极客时间、前端早读课
* 及时总结，不断补充
18、react的生命周期函数有哪些？用的最多的有哪些？哪些场景适合用哪个生命周期函数
19、如何判断两个position:absolute的元素是重叠的
中心点
20、有用过哪些跨域工具，jsonp为什么可以跨域？以及cors怎么设置，后端API如何解决跨域问题
* 原理：动态创建`<script>`标签，然后利用`<script>`的src 不受同源策略约束来跨域获取数据。
* JSONP 由两部分组成：回调函数和数据。动态创建`<script>`标签，设置其src，回调函数在src中设置：
```java
var script = document.createElement("script");
script.src = "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
function handleResponse(response){
    // 对response数据进行操作代码
}
```
* 缺点：
21、一个未知宽高元素怎么上下左右垂直居中
* 对父元素设置：`display:flex`;`justify-content:center`;`align-items:center;`
22、原型链，对象，构造函数之间的一些联系
23、事件的绑定的几种方式（冒泡|默认事件|DOM2，DOM3级的一些标准）
* 绑定方式
	* DOM 中绑定
	* JS绑定，事件处理程序会在事件流的冒泡阶段被处理
	* 事件监听，要考虑兼容性，可以添加多个事件处理程序
* [事件执行顺序](https://www.cnblogs.com/greatluoluo/p/5882508.html)
	* 其他元素捕获阶段事件
	* 本元素代码顺序事件
	* 其他元素冒泡阶段事件
	* 先发生捕获，后发生冒泡
	* 先从根元素执行捕获到目标元素，再从目标元素向上执行。
	* 事件委托即利用事件捕获的原理
	* 利用css阻止事件捕获的传递：pointer-events: none
	* 阻止冒泡事件：e.stopPropagation(); e.cancelBubble = true
	* 某些事件类型天生不支持事件冒泡
24、说一下你对http2.0,websocket,https的理解及所了解的特性，200和304的理解
25、webpack的入口文件怎么配置，多个入口怎么分割
	* 输出文件名不写死，改成中括号变量的形式
26、说一下你对Babel里面的transform-runtime以及stage-2的作用
* polyfill
* 向下兼容草案
27、webpack配置用到webpack.optimize.UglifyJsPlugin这个插件，有没有觉得压缩速度很慢，有什么办法提升速度。
* 减少文件搜索范围：resolve | alias | test | include | exclude 
* 多线程：Happypack
* 缓存：babel的cacheDirectory
28、DOM事件中target和currentTarget的区别
* target：事件流的目标阶段
* currentTarget：事件流的捕获，目标及冒泡阶段
* 只有当事件流处在目标阶段的时候，两个的指向才是一样的，而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象(注册该事件的对象)（一般为父级）
* this指向永远和currentTarget指向一致（只考虑this的普通函数调用）
29、有没有自己写过webpack的loader,说说原理
* loader用于对模块的源代码进行转换，可以使你在“import”或“加载”模块时预处理文件，因此类似于gulp中的“task”
* 输入字符串然后输出字符串
30、webpack的一些原理和机制，怎么实现的
31、babel把ES6转成ES5或者ES3之类的原理是什么
32、ES6的箭头函数this问题，以及拓展运算符
33、JS模块化Commonjs,UMD,CMD规范的了解，以及ES6的模块化跟其他几种的区别，以及出现的意义
34、先自我介绍一下，说一下项目的技术栈，以及项目中遇到的一些问题
35、业务场景：面对产品不断迭代，以及需求的变动该怎么应对，具体技术方案实现。需求一层一层的改变，然后往下挖，主要是考察应对产品能力，以及对代码的可维护性和可拓展性这些考察，开放性问题，我觉得还考察一些沟通交流方面的能力，因为有些地方面试官故意说得很含糊，反正就是一个综合能力，以及对产品的理解。
* 怎么获取一个元素到视图顶部的距离
* getBoundingClientRect获取的top和offsetTop获取的top区别
	* getBoundingClientRect：距离可视区域顶部的距离，在ie中默认坐标是(2,2)开始的，要考虑兼容性
	* offsetTop：包括滚动条卷起的部分
* 事件委托
36、业务场景：比如说百度的一个服务不想让阿里使用，如果识别到是阿里的请求，然后跳转到404或者拒绝服务？
* 首先思考怎么识别到是阿里的IP的
* http协议头Referer，host
37、二分查找的时间复杂度怎么求，是多少
38、XSS是什么，攻击原理，怎么预防。
* 利用script、<IMG>、<IFRAME>等各种方式使得用户浏览这个页面时，触发对被攻击站点的http请求
* 内部攻击：WEB程序没有对用户输入作充分的检查和过滤
* 外部攻击：自己构造一个跨站网页放在自己的服务器上，然后结合其他技术，如社会工程学等，欺骗目标服务器的管理员打开。威胁相对较低，至少ajax要发起跨站调用是非常困难的
* 
39、线性顺序存储结构和链式存储结构有什么区别？以及优缺点
40、怎么实现草稿，多终端同步，以及冲突问题？
类比git的处理方式
41、什么是闭包？闭包有什么缺点
42、react的性能优化？用过的性能优化工具
43、bind的pollyfill实现
44、setTimeout | Promise的实现
45、react16.3移除了哪些新的周期函数，新增了哪些周期函数
46、this的指向问题
47、React引用组件的方式有哪几种？
48、redux的reducer里面提倡重新拷贝一份state数据，为什么要这样做？如果不这样做React会渲染么？为什么？








