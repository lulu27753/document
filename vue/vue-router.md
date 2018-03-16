## 基础配置

将组件映射到路由，然后告诉vue-router在哪里渲染它们。
`<router-link>`: 导航，通过传入 `to` 属性指定链接，默认会被渲染成一个 `<a>` 标签.对应的路由匹配成功，将自动设置 class 属性值 .router-link-active
`<router-view>`: 路由出口,路由匹配到的组件将渲染在这里

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
        ```
        const router = new VueRouter({
                mode: 'history',
                routes: [
                    { path: '*', component: NotFoundComponent }
                ]
            })
        ```

