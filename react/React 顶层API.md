# React 顶层API

## ReactElement

> （虚拟节点）字面量对象，像描述DOM节点的元素.

```__react
{
    type: type,
    props: props,
}

```

### DOM Element

> type: string
代表普通的节点，如div|span

### Component Elements

> type: fn | class
代表自定义的节点

## React.createClass

> 参数：CONFIG(object)

创建一个ReactClass(注册组件类)，参数是一个对象且必须带有render属性方法，该方法必须返回一个封闭的容器(容器内可以有其他不限结构的容器)或null/false(表示啥都不渲染)

```__react
var Component = React.createClass({
    render: function () {
        return this.props.a == 1 ? <div><h1>标题</h1></div> : null
    }
});
React.render(<Component a = '1' />, document.body);
```

> 注意⚠️React.creactClass 会在后续调用自身方法时将 this 自动绑定到当前组件上，自然我们获取到的 this 总会是组件的构造器了

## React.createElement

> 参数：TYPE(string|ReactClass),[PROPS(object)],[CHILDREN(ReactElement)]

创建一个指定类型的ReactElement，注意第三个参数children可以是任意个React元素：

```__react
var Component = React.createClass({
    render: function () {
        return this.props.a == 1 ? <p>123</p> : null
    }
});
React.render(
    React.createElement('div', null,
        React.createElement('p', null,
            React.createElement('span', null, 'Hello'),
            React.createElement('span', null, 'world'),
            React.createElement(Component, {a:1})))
    , document.body
    );
```

```__react
// 其实 React.createElement 是一个语法糖：
var reactElement = React.createElement(type, props, children);
// 等价于下面两行：
var div = React.createFactory('div');
var reactDivElement = div(props, children);

```

## React.cloneElement

> 参数：TYPE(ReactElement),[PROPS(object)],[CHILDREN(ReactElement)]

克隆并返回一个新的ReactElement(内部子元素也会跟着克隆)，新返回的元素会保留有旧元素的props、ref、key,也会集成新的props(只要在第二个参数中有定义)

```__react
var Hello = React.createClass(
    render: function() {
        var span = <span a='1'>LULU</span>;
        var newSpan = React.cloneElement(span, {b:'2'}, <em>Blog</em>);
        console.log(newSpan.props);
        return <div>Hello {span}, {newSpan}</div>;
    }
);
React.render(<Hello />, document.body);
```

> 注意，createElement的第一个参数必须是字符串或ReactClass,而在cloneElement里第一个参数应该是ReactElement;

```__react
var Li = React.createClass({
    render: function() {
        return <li>this.props.i</li>
    }
});

var UI = React.createClass({
    deal: function(child, index) {
        // 注意下面这行换成createElement会报错！因为child是ReactElement而不是ReactClass或字符串
        return React.cloneElement(child, {i:index});
    },
    render: function() {
        return <ul>{this.props.children.map(this.deal)}</ul>;
    }
});

React.render((
    <UI>
        <Li i='9' />
        <Li i='8' />
        <Li i='7' />
    </UI>
    ), document.body);
```

## React.createFactory

> 参数：TYPE(string|ReactElement)

返回一个某种类型的ReactElement工厂函数，可以利用返回的函数来创建一个ReactElement(配置props和children)：

```__react
var Component = React.createClass({
    render: function() {
        return this.props.a == 1 ? <p>123</p> : null
    }
});
var p = React.createFactory(Component),
    ReactElementP = p({a:1}),
    div = React.createFactory('div),
    ReactElementDiv = div(null, ReactElementP);
React.render(
    ReactElementDiv, document.body
);
```

## React.render

> 参数：REACTELEMENT(ReactElement), CONTAINER(DOMElement), [CALLBACK(function)]

渲染一个ReactElement到container指定的DOM中，并返回一个到该组件的引用。如果提供了可选的回调函数，则该函数将会在组件渲染或者更新之后调用；

```__react
var Component = React.createClass({
    render: function() {
        return this.props.a == 1 ? <p>123</p> : null
    }
});
var p = React.render(
    <Component a='1' />, document.body, function() {
        console.log('OK);
    }
);
setTimeout(function() {
    console.log(p.props.a); // 打印出‘1’
}, 2000)

```

🌟因此如果我们希望在组件外部获取到组件内部（能通过this访问）的东西，可以将React.render的返回值赋予一个变量，再后续调用该变量即可。

## React.unmountComponentAtNode

> 参数：CONTAINER(DOMElement)

从container指定的DOM中移除已经挂载的React组件，清楚相应的事件处理器和state。如果在container内没有组件挂载，这个函数将什么都不做。如果组件成功移除，则返回true;如果没有组件被移除，则返回false;

```__react
var Component = React.createClass({
    render: function() {
        return this.props.a == 1 ? <p>123</p> : null
    }
});
React.render(<Component a='1' />, document.body);
setTimeout(function() {
    var isUnmount = React.unmountComponentAtNode(document.body);
    console.log(isUnmount); // 打印出true
}, 2000)

```

## React.renderToString

>参数：REACTELEMENT(ReactElement)

React为服务端提供的一个方法，可以直接输出ReactElement为HTML字符串，将这些标记发送（res.write(HTMLString))给客户端，可以获得更快的页面加载速度，并且有利于搜索引擎抓取页面，方便做SEO(主要针对百度，谷歌已经可以从内存中去抓最终生成的HTML内容)

```__react
var Component = React.createClass({
    render: function() { 
        return this.props.a == 1 ? <p>123</p> : null
    }
});
var com = <Component a='1' />,
comHTML = React.renderToString(com);
console.log(comHTML); // 输出“<p data-reactid=".0" data-react-checksum="-2122315716">123</p>”
```

## React.renderToStaticMarkUp

> 参数：REACTELEMENT(ReactElement)

类似于React.renderToString，但只生成纯粹的HTML标记字符串，不会包含类似data-reactid之类的React属性，从而节省字节数；

```__react
var Component = React.createClass({
            render: function() {
                return this.props.a==1 ? <p>123</p> : null
            }
        });

        var com = <Component a="1" />,
            comHTML = React.renderToStaticMarkup(com);
        console.log(comHTML);  // 输出“<p>123</p>”

```

## React.isValidElement

> 参数：SOMETHING

判断参数是否是一个合法的ReactElement，并返回Boolean值

```__react
        var Component = React.createClass({
            render: function() {
                return this.props.a==1 ? <p>123</p> : null
            }
        });

        var com = <Component/>,
            com2 = '<Component/>';
        console.log(React.isValidElement(com));  //true
        console.log(React.isValidElement(com2));  //false

```

## React.DOM.tag

> 参数：ATTRIBUTE(object|null),CHILDREN(string|ReactElement)

常规是用于在非JSX下创建ReactElement,tag表示相应的DOM类型（比如‘div'|'p').另外首个参数可以定制相关的DOM属性（比如‘name’），第二个参数表示DOM内的内容；

```__react
var div = React.DOM.div({name: 'div1'}, 'HELLO', React.DOM.span(null, <em>WORLD</em>));

React.render(div, document.body);

```

## React.Children

为处理this.props.children这个封闭的数据结构提供了有用的工具。

### React.Children.map(object children, function fn[, object context])

遍历子元素，映射为一个新的子元素集合

```__react
var Component = React.createClass({
    deal: function(child, index) {
        console.log(child, index);
        return !!index && child; // 第一个li会被过滤掉，因为其索引为0
    },
    render: function() {
        return (
            <ul>
                {React.Children.map(this.props.children, this.deal)}
            </ul>
        )
    }
});
React.render(
    (
        <Component>
            <li>0</li>
            <li>1</li>
            <li>2</li>
        </Component>
    ), document.body)
)
```

### React.Children.forEach(object children, function fn [, object context])

遍历子元素，对每个子元素执行回调，但不像map那样最终返回一个新的集合

```__react
var Hello = React.createClass({
    render: function() {
        React.Children.forEach(this.props.children, function(child){
            console.log(child.props, child.key)
        });
        return <div>Hello {this.props.name}</div>;
    }
});
React.render((
    <Hello name='World'>
        <li myProp='test' />
        <li key='blah2' myProp='test2' />
        <li key='blah3' />
    </Hello>
), document.body);

```

### React.Children.count(object children)

返回子元素的总数

```__react
var Component = React.createClass({
    render: function() {
        var nums = React.Children.count(this.props.children);
        return (
            <ul>
                <li>一共有{nums}个子元素</li>
                {this.props.children}
            </ul>
        )
    }
});

React.render((
    <Component>
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </Component>
), document.body)
```

### React.Children.only(object children)

返回仅有的一个子元素，否则（没有子元素或超过一个子元素）报错且不渲染任何东西

```__react
var Hello = React.createClass({
    render: function() {
        return <div>Hello {React.Children.only(this.props.children)}</div>;
    }
});

React.render((
    <Hello name='World'>
        <span>World</span>
        <span>!</span> // ❌会报错，“onlyChild must be passed a children with exactly one child.”
    </Hello>
), document.body);
```