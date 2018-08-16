* CSS 不会阻塞DOM的解析但会阻塞页面渲染：浏览器是解析DOM生成DOM Tree，结合CSS生成的CSS Tree，最终组成render tree，再渲染页面。由此可见，在此过程中CSS完全无法影响DOM Tree，因而无需阻塞DOM解析。然而，DOM Tree和CSS Tree会组合成render tree，CSS顺理成章地阻塞页面渲染。
* JS会阻塞DOM的解析：`<script>`与`<link>`同时在头部，`<link>`在前，浏览器会等CSS文件加载完成后再执行JS，因此JS会阻塞DOM的解析
* JS会阻塞页面渲染
* 每次碰到`<script>`标签时，浏览器都会重新渲染一次页面。
* defer是立即下载但延迟执行
它是按照加载顺序执行脚本的 标记为async的脚本并不保证按照指定它们的先后顺序执行。对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行。
* async是立即下载并执行


## 资源

[CSS 与 JS 阻塞 DOM 解析和渲染](https://juejin.im/post/5b02592051882565bd258a11)