## 路由使用场景

* 如果是功能复杂的网站，建议后端路由，不建议大型网站用前端路由，太重（通常来说就是整个网站，也可能是功能单一的大型网站，比如携程这样的）
* 功能单一的网站，比如webapp那种，建议前端路由（通常说的单页应用SPA）
* 页面有很多组件复用的情况，建议前端路由（如果页面功能复杂，参考第一条）
* 无所谓前端还是后端路由的网站，比如后台管理系统，那就前端路由吧，毕竟无论是Vue还是React,都有好几个搭配的UI库，前端路由会比较顺心
* 功能太简单的网站，简单到就几个静态页面，前端路由、后端路由均可，甚至不需要路由
* 前端路由不能做SEO
* 事情没有绝对性，任何前端路由的网站肯定能用后端路由实现，反之亦然
* 可以把项目按不同的需求拆分开，有些部分后台路由，部分前端路由也可。

## 相互独立的包

* `react-router` React Router 核心
* `react-router-dom` 用于 DOM 绑定的 React Router
* `react-router-native` 用于 React Native 的 React Router
* `react-router-redux` React Router 和 Redux 的集成
* `react-router-config` 静态路由配置的小助手

## `<BrowserRouter>`

* basename: string
    * 作用：为所有位置添加一个基准UR
    * 场景：需要把页面部署到服务器的二级目录
    ```javascript
    <BrowserRouter basename="/minooo" />
    <Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
    ```
* getUserConfirmation: func
    * 作用：导航到此页面前执行的函数，默认使用 window.confirm
    * 场景：当需要用户进入页面前执行什么操作时可用
    ```javascript
    const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
    }

    <BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />
    ```
* forceRefresh: bool
    * 作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面
    ```javascript
    const supportsHistory = 'pushState' in window.history
    <BrowserRouter forceRefresh={!supportsHistory} />
    ```
* keyLength: number
    * 作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
    * 场景：按需设置
    `<BrowserRouter keyLength={12} />`
* children: node
    * 作用：渲染唯一子元素
    * 场景：作为一个 Reac t组件，天生自带 children 属性

## `<Route>`

<Route> 自带三个 render method 和三个 props(match | location | history) 。

### render method

每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component

* `<Route component>`
    * 只有当访问地址和路由匹配时，一个 React component 才会被渲染，此时此组件接受 route props (match, location, history)。
    * 当使用 component 时，router 将使用 React.createElement 根据给定的 component 创建一个新的 React 元素。这意味着如果你使用内联函数（inline function）传值给 component将会产生不必要的重复装载。对于内联渲染（inline rendering）, 建议使用 render prop。

    ```javascript
    <Route path="/user/:username" component={User} />
    const User = ({ match }) => {
    return <h1>Hello {match.params.username}!</h1>
    }
    ```

* `<Route render>`
    * 此方法适用于内联渲染，而且不会产生上文说的重复装载问题。
    * 也可用于子路由

    ```javascript
    // 内联渲染
    <Route path="/home" render={() => <h1>Home</h1} />

    // 包装 组合
    const FadingRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <FadeIn>
        <Component {...props} />
        </FadeIn>
    )} />
    )

    <FadingRoute path="/cool" component={Something} />
    ```
* `<Route children>`

子路由：有时候只想知道访问地址是否匹配，然后改变下别的东西，而不是对应的整个页面

```javascript
<ul>
    <ListIemLink to='somewhere' />
    <ListIemLink to='somewhere-ele' />
</ul>
const ListIemLink = ({to, ...rest}) => (
    <Route path={to} children={({match} => (
        <li className={match ? 'active' : ' '}>
            <Link to={to} {...rest} />
        </li>
    ))}></Route>
)
```

### path: string

* 任何可以被解析的有效URL路径
* 如果不给path，那么路由将总是匹配

### exact: bool

* 精确匹配
* path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。所以在配子路由时千万注意不要配这个参数

### strict: bool

* 对路径末尾斜杠的匹配。如果为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。
* 如果要确保路由没有末尾斜杠，那么 strict 和 exact 都必须同时为 true

## <Link>

为应用提供声明式，无障碍导航
* to: string
    * 作用：跳转到指定路径
    * 场景：如果只是单纯的跳转就直接用字符串形式的路径。
* to: object
    * 作用：携带参数跳转到指定路径
    * 场景：比如你点击的这个链接将要跳转的页面需要展示此链接对应的内容，又比如这是个支付跳转，需要把商品的价格等信息传递过去。
    ```javascript
    <Link to={{
    pathname: '/course',
    search: '?sort=name',
    state: { price: 18 }
    }} />
    <Link to="/courses" />
    ```
* replace: bool
    * 为 true 时，点击链接后将使用新地址替换掉上一次访问的地址，什么意思呢，比如：你依次访问 '/one' '/two' '/three' ’/four' 这四个地址，如果回退，将依次回退至 '/three' '/two' '/one' ，这符合我们的预期，假如我们把链接 '/three' 中的 replace 设为 true 时。依次点击 one two three four 然后再回退会发生什么呢？会依次退至 '/three' '/one'！
    * 场景：在用 路由 做选项卡时候会用到

## `<NavLink>`

为了实现页面导航的“激活状态”，是`<Link>`的特别版本
* activeClassName: string
    * 导航选中激活时候应用的样式名，默认样式名为 active

```javascript
<NavLink
  to="/about"
  activeClassName="selected"
>MyBlog</NavLink>
```
* activeStyle: object
    * 如果不想使用样式名就直接写style
* exact: bool
    * 若为 true，只有当访问地址严格匹配时激活样式才会应用
* strict: bool
    * 若为 true，只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用
* isActive: func
    * 决定导航是否激活，或者在导航激活时候做点别的事情。不管怎样，它不能决定对应页面是否可以渲染。

## `<Switch>`

只渲染出第一个与当前访问地址匹配的 `<Route>` 或 `<Redirect>`
场景：对于转场动画非常适用，因为被渲染的路由和前一个被渲染的路由处于同一个节点位置！
```javascript
<Fade>
  <Switch>
    {/* 用了Switch 这里每次只匹配一个路由，所有只有一个节点。 */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* 不用 Switch 这里可能就会匹配多个路由了，即便匹配不到，也会返回一个null，使动画计算增加了一些麻烦。 */}
</Fade>
```

* children: node
* `<Switch>` 下的子节点只能是 `<Route>` 或 `<Redirect>` 元素。只有与当前访问地址匹配的第一个子节点才会被渲染。`<Route>` 元素用它们的 `path` 属性匹配，`<Redirect>` 元素使用它们的 `from` 属性匹配。如果没有对应的 `path` 或 `from`，那么它们将匹配任何当前访问地址。

## `<Redirect>`

渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址
* to: string
重定向的 URL 字符串
* to: object
重定向的 location 对象
* push: bool
若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。
* from: string
需要匹配的将要被重定向路径

## `<Prompt>`

当用户离开当前页面前做出一些提示。
* message: string
当用户离开当前页面时，设置的提示信息。
`<Prompt message="确定要离开？" />`
* message: func
当用户离开当前页面时，设置的回掉函数
`<Prompt message={location => (
  `你确定要跳转到 ${location.pathname}页面吗?` 
)} />`
* when: bool
通过设置一定条件决定是否启用Prompt

## history

实现了对会话（session）历史的管理
* "browser history" - history 在 DOM 上的实现，用于支持 HTML5 history API 的浏览器
* "hash history" - history 在 DOM 上的实现，用于旧版浏览器。
* "memory history" - history 在内存上的实现，用于测试或非 DOM 环境（例如 React Native）

history的属性和方法
* length: number 浏览历史堆栈中的条目数
* action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
* location: object 当前访问地址信息组成的对象
    * pathname: string URL路径
    * search: string URL中的查询字符串
    * hash: string URL的 hash 片段
    * state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state 只有在 browser 和 memory history 有效。
* push(path, [state]) 在历史堆栈信息里加入一个新条目
* replace(path, [state]) 在历史堆栈信息里替换掉当前的条目
* go(n) 将 history 堆栈中的指针向前移动 n
    * goBack() 等同于 go(-1)
    * goForward 等同于 go(1)
* block(prompt) 阻止跳转

history 对象是可变的，因为建议从 <Route> 的 prop 里来获取 location，而不是从 history.location 直接获取。这样可以保证 React 在生命周期中的钩子函数正常执行

## location

* 当前的位置，将要去的位置，或是之前所在的位置
* location 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。
* 场景：在获取远程数据以及使用动画时非常有用

```javascript
{
  key: 'sdfad1'
  pathname: '/about',
  search: '?name=minooo'
  hash: '#sdfas',
  state: {
    price: 123
  }
}
```

获取location对象
* 在 Route component 中，以 this.props.location 获取
* 在 Route render 中，以 ({location}) => () 方式获取
* 在 Route children 中，以 ({location}) => () 方式获取
* 在 withRouter 中，以 this.props.location 的方式获取

## match

* 包含了 <Route path> 如何与 URL 匹配的信息
    * params: object 路径参数，通过解析 URL 中的动态部分获得键值对
    * isExact: bool 为 true 时，整个 URL 都需要匹配
    * path: string 用来匹配的路径模式，用于创建嵌套的 <Route>
    * url: string URL 匹配的部分，用于嵌套的 <Link>
* 当一个 Route 没有 path 时，它会匹配一切路径。

获取 match 对象
* 在 Route component 中，以 this.props.match获取
* 在 Route render 中，以 ({match}) => () 方式获取
* 在 Route children 中，以 ({match}) => () 方式获取
* 在 withRouter 中，以 this.props.match的方式获取
* matchPath 的返回值

## 坑

* 通过router 的 history.push() 方法延迟跳转后还是会跳转
* 在当前目录下的文件路径不再使用./, 而是直接用/
* <Route component> 的优先级要比 <Route render> 高，所以不要在同一个 <Route> 中同时使用这两个属性。
* 

