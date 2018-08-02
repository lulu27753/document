## IE9

* 不支持flex布局
* css行数过多会不加载，需要用CSSSplitWebpackPlugin分割

```java
new CSSSplitWebpackPlugin({
    size: 4000,
    filename:utils.assetsPath('css/[name]-[part].[ext]'),
    }),
```

* 不支持websocket
* vue框架:
    * 刷新多次才显示界面
    * 滚动条 | 下拉框箭头 | 展开箭头 | 排序箭头
    * 消息x号不居中
    * 列表获得焦点样式,没有边框线

## IE JS兼容性

* **事件绑定方法**为attachEvent而不是通用的addEventListener
* **事件捕获方式**由内而外而不是由外而内，一般将IE的标准定为标准
* **事件获取目标元素**event.srcElement而不是event.target
* **ajax**是activeXObject
* **innerHtml**IE中不能操作tr的innerHtml
* **获取DOM节点**

    * IE: parentElement | parentElement.children
    * other: parentNode | parentNode.childNodes

## 在HTML中禁止IE缓存

IE浏览器提供的ajax对象在发送get请求时，会查看请求地址
是否访问过，如果访问过，则显示第一次访问的结果（也就是说，
会将第一次访问的结果缓存下来）

* 在Head里添加禁止使用缓存的代码

```html
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
```

* 将所有的ajax调用都改为post方法
* 在请求地址后面添加随机数或者时间戳,
    比如xhr.open('get','luck.do?'+Math.random(),true);

## 兼容性测试工具

* [browserling](https://browserling.com/)
* [在HTML中禁止IE缓存](https://blog.csdn.net/cooldiok/article/details/79134245)