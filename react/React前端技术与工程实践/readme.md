* 只要存在从虚拟DOM到真实DOM的转换器，就可以实现虚拟DOM的最终界面呈现，从而达到跨平台的目的。而从虚拟DOM到真实DOM的转换工具由react-dom实现，从虚拟DOM到移动APP的转换工具由react-native实现。
* 组件：封装起来的具有独立功能的、可复用的UI部件
* 一个组件应该具有的特征
    * 可组合性(Composeable):一个组件可以很方便的与其他组件一起配合使用，或者嵌套在另一个组件的内部。如果一个组件内部创建包含了另一个组件，那么父组件拥有(own)它创建的子组件。通过这个特性，一个复杂的UI组件可以拆分成多个简单的UI组件
    * 可重用性(Reusable)：每个组件都是具有独立功能的单元，它可以不加更改的在多个UI场景重复使用
    * 可维护性(Maintainable):每个小的组件仅仅包含自身的完整逻辑，更容易被理解和维护
* React组件：带有props属性集合和state状态集合并且构造出一个虚拟DOM结构的对象。其核心是render函数，该函数负责该组件虚拟DOM的构建。props属性集合保存组件的初始属性数据；state状态集合保存组件的状态数据；render函数的主要职责是根据state状态，结合props属性，进行虚拟DOM的构建。所有的变化均由状态的变更引发，状态的变更通过调用组件实例的setState(data, callback)完成
* 使用ReactLink也可以将React拓展为双向绑定，但不建议使用
* React并不非常认同MVC开发模式，但可以拓展为MVC架构，如Router和Flux
* React虽然具有服务器端渲染的能力，但其实现只能基于Node.js架构，目前还不能在其它平台上使用
* React
    * react.js:实现React核心的逻辑，且与具体的渲染引擎无关，从而可以跨平台共用。包含了React.createElement | React.createClass等核心API
    * react-dom.js: 包含了具体的DOM渲染更新逻辑，以及服务器端渲染的逻辑。主要API为ReactDOM.render
    * React支持的浏览器有IE8以上版本、Chrome和Firefox
* 通过React.createElement调用产生的元素是“虚拟DOM”，虚拟DOM树由ReactDom.render()渲染到实际的浏览器DOM节点上，形成最终的界面效果
* ReactNode:轻量的、无状态的、不可变的虚拟DOM元素。其数据来源可以是字符串(string)|数字串(number) | ReactElement；同时ReactNode也支持嵌套，可包含ReactNode的数组，多级嵌套的ReactNode最终形成一颗虚拟DOM树
* ReactElement：是ReactNode的主要数据来源，有四个属性：type | props | key | ref
* React内部的渐进式更新机制：
    通常React并不直接操作浏览器DOM，而是操作内部的虚拟DOM。当数据发生改变时，React现在虚拟DOM中自动计算判断出局部对应变更的部分，最后只将变更的部分反应到真实的浏览器DOM中。频繁操作DOM会导致页面反复重画，代价昂贵，同样如果每次更新都是整体虚拟DOM发生变化，那么React快速的优势就不复存在了，但这种整体发生变化是很难发生的，因为这种情况完全可以设计为两个不同的组件了。实际使用中绝大多数变更都是局部变化。
* 虚拟DOM的特殊属性：
    * key:可选的唯一标识符。当组件在渲染过程中被打乱的时候，按照差异检测逻辑，有时候可能会发生组件先被销毁而后又被重新创建的情况，产生不必要的开销。通过给组件绑定一个唯一的key属性，可以避免这样的问题
    * ref:用于访问组件对应的实际DOM元素。在某些情况下，可能会需要直接操作一个组件渲染后所对应的DOM标记，比如要调整DOM元素的绝对位置，或者在大型的非React应用中使用React组件，或者在React中重复使用已有的代码库等。React给出的解决办法是使用ref属性。
    * dangerouslySetInnerHTML:用来直接插入纯HTML文本字符串，避免React的自动转义。例如当我们需要展示从后台取到的含有标签的富文本数据时可使用该属性。
* 前端应该组件化，然而传统的前端组件化思想是基于模版技术的，结构化标记和生成结构化标记的代码是紧密关联的，展现逻辑一般都很复杂，使用模版语言会使展现变得笨重。而React通过JS代码生成HTML和组件树，其理念是组件与关注点分离，可以使用JS丰富的表达力去构建UI。
* JSX语法转译器：当遇到“<"标识符就会启动JSX转译过程，遇到“{"标识符就会当作JS代码处理。元素的标签、属性、子元素都会被当作参数传给React.createElement()
* JSX中的注释：在JSX中使用注释与在JS中使用注释一样，本质上它就是JS的一部分。但是要注意⚠️：当注释作为独立子节点时需要用{}包起来。
* React的设定中，初始化props后，props是不可变的
* React中当需要增加组件的属性时，定义一个展开属性对象，并通过{...extendProps}的方式引入，React会自动将extendProps中的属性复制到组件的props属性中。⚠️：这里的“...“是属性展开的特殊标识，ES6中也使用“...“作为解构赋值中剩余属性标识，但两者没有关系。
* JSX中特殊属性：
    * class属性必须以className代替
    * `<label>`标签的属性for必须用htmlFor代替
* JSX中行内样式：在React中，行内样式style并不是以CSS字符串的形式出现，而是一个特定的带有驼峰命名风格的JS样式对象。这样的设计是为了与DOM中style的JS属性名保持一致，且有助于弥补XSS安全漏洞。在这个样式对象中，key值是用驼峰形式表示的样式名，而其对应的value则是样式值，通常是一个字符串。
* React将界面组件看成一个状态机，用户界面拥有不同状态并根据状态进行渲染输出，用户界面和数据始终保持一致。
* props:
    * 整个组件生命周期中都是只读的，是组件从外界接收静态信息的主要渠道
    * 相对固定的、组件内只读的、应由父组件传递进来的属性适合放在props中，如组件的类名、颜色、字体、事件响应回调函数等
    * this.props.children:数组中会包含本组件实例的所有子组件
    * this.props.context:跨级包含上级组件的数据等
* render():
    * 检测this.props和this.state，再返回一个单一组件实例，也可返回null或false表明不需要渲染任何东西
    * 在这个函数中，不应该修改组件state，不读写DOM信息，也不与浏览器交互。
    * 确实需要与浏览器交互，则应在生命周期函数中设置
    * 其返回的内容是子组件层级树实例在特定时间的一个描述，React会根据这个描述进行差异分析，再生成实际的组件实例
* 实例化阶段：
    * getInitialState():用于对本组件实例的state初始数据，赋予组件实例的默认值，对于每一组组件实例，该方法会被调用且仅调用一次
    * componentWillMount()：在初始化渲染执行之前立刻调用，该方法只执行一次。如果在这个方法内调用setState(),render()将会感知到更新后的state
    * render()：该方法用于创建虚拟DOM，表示组件的输出.其返回的虚拟DOM被用于与浏览器DOM进行对比，并决定最终要更新的浏览器DOM内容。
        * 只能读取props和state,不能更改其中的值
        * 只能返回一个ReactElement元素或者null|false
    * componentDidMount()：在render()被调用，浏览器DOM被渲染后，该方法被调用。此时的浏览器DOM已经被创建，且可通过调用this.getDOMNode获得对应的浏览器DOM元素。该方法可用于对浏览器DOM做进一步修改或其他操作。通常在这个方法里进行state数据的填充，如进行AJAX请求；如果要和jQuery集成，也是在该函数操作。
* 活动阶段:对用户事件的响应，通常会引发state的改变，进而导致组件的界面被刷新
    * componentWillReceiveProps():在接收到新的props的时候被调用。是在prop传入之后渲染之前更新state的最佳时机。旧的props可以通过this.props获取到。在该函数中调用this.setState()不会引起第二次渲染。如果需要在state改变的时候执行一些操作，应使用componentWillUpdate()
    * shouldComponentUpdate():手动控制组件是否需要更新。如果返回false,则render() | componentWillUpdate() | componentDidUpdate()均会被忽略，直到下一次state改变。如果确实遇到了性能瓶颈，可以考虑小心地使用以提升应用的性能，但需要仔细确认在带来明显的性能提升的同时并不会引发逻辑上的混乱，应尽量谨慎使用。
    * componentWillUpdate():在接收到新的props或者state之前立刻调用，不能在该方法中使用this.setState()
    * componentDidUpdate():在组件的更新已经同步到DOM中之后立刻被调用，使用该方法可以在组件更新之后操作DOM元素
    * componentWillUnmount():在组件从DOM中移除的时候立刻被调用。在该方法中执行任何必要的清理，比如无效的定时器，或者清除在componentDidMount中创建的DOM元素。
* 事件响应
    * 事件代理：在顶层使用一个全局的事件监听器监听所有事件。React在内部维护一个映射表记录事件与组件事件处理函数的对应关系，当某个事件发生时，React根据这个内部映射表将事件分派给指定的事件处理函数。当映射表中没有事件处理函数时，不做任何操作。当一个组件安装或卸载时，相应的事件处理函数会自动被添加到事件监听器的内部映射表中或从表中删除
    * 事件自动绑定：事件的回调函数被绑定在React组件上，而不是原始的元素上，即事件的回调函数中this所指的是组件实例而不是DOM元素。React通过一个autobinding的过程自动将回调函数绑定到当前的组件实例上。
* 合成事件：React中事件处理程序所接收的事件参数是“合成事件（SyntheticEvent)"的实例。合成事件是跨浏览器原生事件跨浏览器的封装，并与浏览器原生事件有着同样的接口，而且这些接口是跨浏览器兼容的。每个合成事件实例都有以下通用属性：
    * boolean bubbles
    * boolean cancelable
    * DOMEventTarget currentTarget
    * boolean defaultPrevented
    * Number eventPhase
    * boolean isTrusted
    * DOMEvent nativeEvent
    * void preventDefault()
    * void stopPropagation()
    * DOMEventTarget target
    * Date timeStamp
    * String type
* 组件的其他成员：
    * string displayName:用于输出调试信息
    * object getDefaultProps:在实例创建前调用，因此不能依赖于this.props。另外其返回的任何复杂对象在实例间共享，而不是每个实例拥有一份
    * array mixins:用于定义在多个组件间共享的函数代码。在组件的mixin中定义的函数会自动合并，成为组件的成员函数。
    * object statics:用来定义可以在组件类上调用的静态方法
* 哪些组件应该有state:对用户输入、服务器请求、时间变化等需要作出响应并暂存中间状态时
* 哪些数据应该放入state：包括可能被组件的事件处理器改变并触发用户界面更新的数据
* 哪些数据不该放入state:
    * 计算所得数据
    * React组件
    * 基于props的重复数据
* children:
    * React.Children.map()
    * React.Children.forEach()：类似map,但不返回对象
    * React.Children.count():返回children中包含的组件总数
    * React.Children.only():返回children中仅有的子组件，如果子组件不存在或不唯一则会抛出异常
    * React.Children.toArray():返回由各子元素组成的数组，常用于渲染事件中操作子元素集合，如重新排序或分割子元素等场合
* 组件外在体现的是可复用性，内在体现的则是封装性，通过封装明确边界，将组件内在实现与外在接口区分开，屏蔽了组件的内部实现细节。
* 组件嵌套：
    * 直接在父组件的render()中直接渲染子组件，前提是子组件的类型和属性均是已知的
    * 当子组件类型和属性是设计时未知的或者是动态加入的，使用this.props.children.需要对子组件进行更进一步的控制，比如过滤其中的某些子组件或限制必须为某种类型的子组件。
* 组件参数传递：具有父子或上下级关系的自上而下的单向数据流
    * 动态参数传递：通过加入标识符“..."，一方面可以使用展开属性的方法，直接传递一个属性对象；另一方面可以使用剩余属性的方法，把未知属性提取出来，而不用把所有属性都传下去导致冗余或安全问题。
    * Underscore：_.omit():过滤属性；_.extend():复制属性到新的对象
    * Context: 实现组件树上的数据越级传递，React自动向下传递数据，使得组件树中上层组件的任意层级的下级组件都能获得上层组件中的数据。Context机制在React的路由管理框架router中也有应用。
        * 下级组件必须指定context的数据类型（contextTypes）
        * 下级组件通过this.context来获取context数据
        * 上级组件必须要声明childContextTypes属性
        * 上级组件必须要声明getChildContext回调函数
* 组件通信：没有父子或上下关系的两个组件
    * 事件回调机制：
        * 子组件自下而上通知父组件：父组件在props中增加一个回调函数，子组件在恰当的时机调用这个回调函数通知父组件，从而实现两者的通信，这需要子组件预先约定好这个回调接口，并且父组件遵从这个约定。
        * 没有隶属关系的组件间通信：在componentDidMount()里订阅事件，在componentWillUnmount()里退订，然后在事件回调里调用setState()。前提是组件设计时就约定了相应的事件。
    * 公开组件功能：父组件通过ref属性获得子组件实例的引用。
    * mixins: 跨切面关注点。如输出日志、创建和销毁定时器。如果mixin中定义了多个mixin，则按声明的顺序依次执行。副作用：破坏封装性。
    * 高阶组件：对现有组件的动态包装函数，与普通函数稍有区别的是它接受组件类型作为输入参数，并输出经过包装后的新组件类型。
        * 对现有组件增加或修改功能
        * 属性转换器：想要的组件与现有组件在功能上相似，但组件的参数并不一致时使用。
        * 数据请求和数据展现逻辑分离
    * 动态子集：通过给每个子组件都赋予一个唯一标识key来确保子组件在多个渲染阶段保持自己的特征和状态。当遇到带有Key的子组件时，React会确保它们被重新排序而不是重建，key只对组件有效，对HTML元素不起任何作用。
* 绑定React未提供的事件：React的事件是面向虚拟DOM的，对于未提供的有些真实的浏览器DOM事件，需要在componentDidMount中获取对应的真实DOM元素绑定事件，并在componentWillUnmount中取消事件绑定。这种技巧也常用于React与jQuery结合使用。
* 通过AJAX加载初始数据：AJAX请求的源URL应该通过props传入；在componentDidMount()中加载数据；加载成功，将数据存储在state中，通过调用setState来触发渲染更新界面；⚠️AJAX是一个异步请求，即使componentDidMount()调用完毕，数据也不会马上就获得，浏览器会在数据完全到达后才调用Ajax中所设定的回调函数，有时间差。因此当响应数据、更新state前，先通过this.isMounted()来检测组件的状态是否已经mounted。
* ref回调函数属性：一旦引用的组件被卸载，或者ref属性本身发生了变化，原有的ref会再次被调用，此时参数为null，这样可以防止内存泄露。内联函数表达式，会使得React每次更新(即调用渲染函数)时，都会得到不同的函数对象，之后每次更新时ref回调函数都会被调用两次：前一次参数是null，后一次是具体的组件实例。
    * 不要在任何组件的渲染函数或者被渲染函数调用的过程中访问refs
    * 在Google Closure Compiler的高级模式下，不能访问用字符串形式声明的动态属性，即如果定义ref='myRefString',则必须以this.refs['myRefString']的形式来访问引用。
    * 对于stateless function来说，引用不会被加载，因为无状态组件并没有对应实例。可以使用标准的复合组件来包装一个无状态组件，以在其上附加引用。
* classNames.js: class动态切换
    * 可以接受任意数量的参数，并将参数连接成一个class字符串，参数可以是一个字符串或者一个对象
    * 对象：对象的属性名(属性值为false | 0 | null | undefine 的除外)也会加入到结果class字符串中
    * 数组：数组中的元素也被当作参数进行处理
    * ES6动态属性特性：classNames({[`btn-${buttonType}`]: true});
    * 多类名去重：depupe模块包含去重的功能，但是性能要差些，如非确实有去重需求，没必要使用它
* Immutable.js:
    * JS中的对象具有共享变量机制，一般使用对象复制来避免这个问题，但马上会遇到是浅复制还是深复制的选择，把问题复杂化。
    * 持久化数据结构：对Immutable数据对象的任何修改|添加|删除操作都会返回一个新的Immutable对象，同时原对象依然可用且不可变
    * 结构共享：避免深度复制，如果对象树中只有一个节点发生了变化，则只修改受到影响的父节点对它的引用，其他节点则与原对象共享，从而避免了深度复制带来的内存开销
    * 支持回撤、并发安全、与函数式编程天然一致
    * React提倡把this.state当作只可创建不能更改的Immutable，Redux推荐搭配使用Immutable来管理state数据
* React与jQuery的区别
    * DOM操作方式不同：jQuery主要操作的是实际DOM元素，React操作的是虚拟DOM，React是数据驱动的，很少需要操作DOM，只需要关注数据的变化即可。另外jQuery中有专门针对不同浏览器的处理方案，由于React包含了由虚拟DOM到真实DOM的转换模块则不再需要。
    * 元素选取方式不同：jQuery通过选择器选择元素，React由于是虚拟DOM，通过ref
    * 渲染方式不同：jQuery根据具体的实现决定整体还是部分更新；React考虑的是整体更新机制，在实际更新的时候更新的是局部
    * 事件处理方式不同：两者都在原生JS的基础上封装了一套自己的事件处理逻辑
* 在React中使用jQuery：
    * 重点关注componentDidMount | componentWillUnmount,在这两个函数内适配jQuery的生命周期
    * 通过ref获取真实浏览器DOM元素
    * 注意jQuery事件系统与React不同
* 路由：在浏览器当前的URL发生变化时做出对应的响应，用来保证视图与URL的同步
* 后端路由：每次访问一个新页面的时候都要向服务器发送请求，然后服务器响应请求
* 前端路由：访问一个新页面的时候仅仅变换了一下路径，没有网络延迟。因此前端路由相较于后端路由，在性能和用户体验上会有相当大的提升。
* 路由职责：记录一些重要的状态，比如用户的登陆状态、当前访问资源、用户的上一访问资源等，并根据需要重新以同步或异步的方式向服务端请求获取资源，然后重新渲染视图。
* path属性：指定路由的匹配规则。
    * 绝对路由：以“/”开头
    * 相对路由：不以“/”开头
    * 通配符执行规则：自上而下，一旦发现匹配，则不再考虑其他规则了
    * ![通配符](../assets/wildcards.png)
    * Route会将参数通过this.props.location.query传入组件
* NotFoundRoute: 用于声明父组件匹配成功但没有找到匹配的子组件时所激活的子组件
    * handler：用来声明处理路由不匹配的子组件
    * 并不是针对资源没有被找到而设计的。路由没有匹配到特定的URL与通过一个合法的URL没有查找到资源是有区别的。如course/123是一个合法的URL并能够匹配到对应的路由，但是却没有匹配的组件
* history属性：
    * 监听浏览器地址栏的变化，并将URL解析成一个地址对象，供React Router匹配
    * browserHistory：显示正常路径，底层是依托于浏览器本身的History API 实现的。由于地址是在本地切换完成的，而不是由服务器响应的，如果向服务器请求子路由则会显示网页找不到。如果使用webpack-dev-server作为开发服务器，在命令行加上--history-api-fallback可以避免这个问题。
    * hashHistory：根据hash值进行切换
    * createMemoryHistory：用于服务器端渲染，只是创建一个内存中的history对象，并不与浏览器URL互动。
* 路由回调：
    * onLeave():在用户进入该路由时被触发，实现认证功能
    * onEnter():在用户离开该路由时被触发
* Link组件
    * 取代`<a>`元素的React版本，生成一个链接，允许用户单击后跳转可以接收Router的状态
    * activeStyle属性：配置路由样式
    * activeClassName属性：指定当前路由的Class
    * onlyActiveOnIndex属性：设置为true，链接到根路由
* 动态路由切换：
    * 1、browserHistory.push():需要预先将Router的history属性声明为browserHistory
    * 2、利用context机制提取router对象，从而调用router.push(path)完成路由切换
* Redux:
    * Action：表达操作
    * Reducer：根据Action更新State，复制Redux的更新逻辑
    * Store：存储数据

* 脚手架
    * [React Starter Kit — (Node.js, Express, GraphQL, React.js, Babel, PostCSS, Webpack, Browsersync)](https://github.com/kriasoft/react-starter-kit)
    * [React-Boilerplate](https://www.reactboilerplate.com/)