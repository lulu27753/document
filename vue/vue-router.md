## 前端路由

* 路由：每次GET或POST等请求在服务端有一个专门的正则配置列表，然后匹配到具体的一条路径后，分发到不同的Controller,进行各种操作，最终将html或数据返回给前端，就完成了一次IO

* 后端路由：
  * 优点：
    * 页面可以在服务端渲染好直接返回给浏览器，不用等待前端加载任何js和css就可以直接显示网页内容
    * 对SEO友好
  * 缺点：
    * 模板由后端来维护或改写
    * 前端需要安装整套的后端服务，必要时还要学习后端语言来改写html结构，所以html和数据、逻辑混为一谈，维护起来既臃肿又麻烦

* SPA：前后端分离 + 前端路由
  * 前后端分离：后端只提供API来返回数据，前端通过Ajax获取数据后，再用一定的方式渲染到页面里
  * 前端路由：由前端来维护一个路由规则


## 基础配置

将组件映射到路由，然后告诉vue-router在哪里渲染它们。
* `<router-link>`: 导航，
    * 通过传入 `to` 属性指定链接，默认会被渲染成一个 `<a>` 标签.对应的路由匹配成功，
    * 将自动设置 class 属性值 `.router-link-active`
    * tag: 可以指定渲染成什么标签。`<router-link to="/about" tag="li">`渲染结果就是`<li>`而不是`<a>`
    * replace:使用该属性后不会留下History记录，所以导航后不能用后退键返回上一个页面。
* `<router-view>`: 路由出口,路由匹配到的组件将渲染在这里

JS：

* 定义（路由）组件：
* 定义路由：每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
* 创建 router 实例，然后传 `routes` 配置：可以传入配置参数；嵌套路由，配置children参数，使用嵌套组件而无须设置嵌套的路径
* 创建和挂载根实例：要通过 router 配置参数注入路由，从而让整个应用都有路由功能

## 编程式导航

通过 $router 访问路由实例，因此可以调用 this.$router.push

* router.push(location, onComplete?, onAbort?)：向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL
* router.replace(location, onComplete?, onAbort?)：不会向 history 添加新记录，而是替换掉当前的 history 记录。
* router.go(n)：在 history 记录中向前或者后退多少步

## 重定向和别名

* 重定向：当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b。redirect参数
* 别名：/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。alias参数

## 向路由组件传参

在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，通过 props 解耦。

* 布尔模式： props 被设置为 true，route.params 将会被设置为组件属性。
* 对象：会被按原样设置为组件属性。当 props 是静态的时候有用。
* 函数：创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

## HTML5 History 模式

* vue-router默认hash模式
* history模式：
    * 向vue实例传入参数mode:'history'
    * 充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
    * 需要后台配置支持
    * 服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。
        * 为了避免这种情况，应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。
        * 
        ```js
        const router = new VueRouter({
                mode: 'history',
                routes: [
                    { path: '*', component: NotFoundComponent }
                ]
            })
        ```
## 导航钩子

* beforeEach: 在路由改变前触发。使用场景：可以在这个阶段设置`<title></title>`| 校验是否登录
* afterEach: 在路由改变后触发。使用场景：从一个页面滚动到另一个页面，如返回顶端 | 全局的Loading动画

导航钩子的3个参数:

* to: 即将要进入的目标的路由对象
* from: 当前导航即将要离开的路由对象
* next: 调用该方法后，才能进入下一个钩子。
    * 参数设置为false：可以取消导航
    * 设置为具体的路径可以导航到指定的页面

window.document.title = to.meta.title;

路由列表的meta字段可以自定义一些信息，可以将title写入到meta信息里

