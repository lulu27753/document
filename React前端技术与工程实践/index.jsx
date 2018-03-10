// 绑定React未提供的事件
var Comp = React.createClass({
    getInitialState: function () {
        return {windowWidth: window.innerWidth};
    },

    onWindowResize: function (e) {
        this.setState({windowWidth: window.innerWidth});
    },

    componentDidMount:function () {
      window.addEventListener('resize', this.onWindowResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.onWindowResize)
    },

    render: function () {
        return <div>当前window宽度：{this.state.windowWidth}</div>
    }
});

React.render(<Comp />, document.body)

// 通过AJAX加载初始数据
var UserGist = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            lastGistUrl: ''
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function (result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                })
            }
        }).bind(this);
    },

    render: function () {
        return (
            <div>{this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a></div>
        )
    }
})
React.render(<UserGist source='https://api.github.com/users/octocat/gists' />, mountNode)

// 使用ref属性
// ref属性对于React组件获得的是组件实例，而对于HTML获得的则是对应的真实浏览器DOM元素，对于前者，可以直接调用组件在类定义中公开的任何成员函数
var MyComp = React.createClass({
    getInitialState: function () {
        return {userInput: ''}
    },
    handleChange: function () {
        this.setState({userInput: e.target.value})
    },
    clearAndFocusInput: function() {
        // 清空输入的数据
        this.setState({userInput: ''}, function () {
            // 此处获得真实DOM并获得焦点
            this.refs.theInput.getDOMNode().focus();
        })
    },
    render: function () {
        return (
            <div>
                <div onClick={this.clearAndFocusInput}>单击获得焦点并清空</div>
                <input ref='theInput' value={this.state.userInput} onChange={this.handleChange}/>>
            </div>
        );
    }
})

// ref 回调函数属性，这个回调函数会在组件被挂载后立刻被执行。回调函数的参数对应组件实例的引用
var MyComp = React.createClass({
    getInitialState: function() {
        return { userInput: ''}
    },
    handleChange: function(e) {
        this.setState({userInput: e.target.value})
    },
    clearAndFocusInput: function() {
        // 清空输入的数据
        this.setState({userInput: ''}, function () {
            // 此处获得真实DOM并获得焦点
            this.theInput.focus();
        })
    },
    render: function() {
      return (
        <div>
          <div onClick='this.clearAndFocusInput'>单击获得焦点并清空</div>
          <input
            ref={(compInstance) => this.theInput=compInstance}
            value={this.state.userInput}
            onChange={this.handleChange}
           />
        </div>
      );
    }
})

// 创建Immutable对象
import Immutable from 'immutable'
// 支持数据嵌套的创建方式
var imtArray = Immutable.fromJS([1, {2:2, 3:3}])// 根据数组创建
var imtObj = Immutable.fromJS({a:1, b:[2, 3]})// 根据JS对象创建
// 不支持数据嵌套的创建方式
var imtList = Immutable.List([1, 2])// 根据数组创建，支持数据
var imtMap = Immutable.Map({a: 1})// 根据JS对象创建


// 从Immutable对象中提取JS对象
var jsObject = immutableData.toJS(); // 提取JS对象
var jsArray = imtArray.toArray(); // 提取数组对象

// 引用比较：识别两个对象是不是同一个对象，使用操作符===进行比较
// 只比较内存地址，即使两个不同的对象内容一样也被认为是不相等的
let map1 = Immutable.Map({a:1, b:2, c:3})
let map2 = Immutable.Map({a:1, b:2, c:3})
map1 === map2; // false

// 值比较：判断两个数据对象的值是否相等，使用Immutable.is()
// 实质上比较的是两个对象的hashCode或valueOf()
// 由于Immutable使用持久化数据结构存储对象，只要两个对象的hashCode值相等，两个对象的值就是一样的
// 有效地避开了对对象值的深度遍历，非常高效
Immutable.is(immutableObjectA, immutableObjectB);

// Immutable List
Immutable.List();// 生成空的Immutable List对象
Immutable.List([1, 2]);// 生成Immutable数组对象，不支持嵌套
Immutable.fromJS([1, {2:2, 3:3}]);// 生成Immutable数组对象

// 查看List的大小
ImmutableA.size
ImmutableA.count()

// 判断是否是List
Immutable.List.isList(x)

// 在React组件中判断propTypes是否是List的写法
React.PropTypes.instanceOf(Immutable.List).isRequired

// 获取List索引的元素
immutableData.get(0);
immutableDate.get(-1);// 当索引值为负数时为反向索引

// 访问嵌套数组中的数据
var imtNestedData = Immutable.fromJS({a: {b: {c:3}}});
imtNestedData.getIn(['a', 'b', 'c']);// 结果为3

// 更新List，其实就是根据原来的List对象创建一个新的List对象
immutableA = Immutable.fromJS([0, 0, [1, 2]]);
immutableB = ImmutableB.set(1, 1);
immutableC = ImmutableB.update(1, (x) => x + 1);
immutableC = ImmutableB.update([2, 1], (x) => x + 1);

// 针对List的排序方法有sort和sortBy
immutableData.sort(function (a, b) {
    if (a < b) {return -1};
    if (a > b) {return 1};
    return 0;
});
immutableData.sortBy((x) => x)

// 遍历
immutableData.forEach(function (a, b) {
    // 此处进行遍历操作
    return true; // 如果返回值为false则终止遍历
})

// 检索List中的元素
immutableData.find((x) => x > 1)// 返回第一个匹配的元素
immutableData.filter((x) => x > 1)// 返回匹配的元素的数组
immutableData.filterNot((x) => x <= 1)// 返回不匹配的所有元素的数组

// 创建Immutable Map
Immutable.Map();
Immutable.Map({a: 1});
Immutable.fromJS({a: 1})

// 判断Map
Immutable.Map.isMap(obj)

// 获取Map中的数据
immutableData.get('a')

// 访问嵌套的Map中属性a值对象中b属性的值
immutableData.getIn(['a', 'b'])

// 更新对象
immutableB = immutableA.set('a', 1)
immutableB = immutableA.setIn(['a', 'b', 1])
immutableB = immutableA.update('a', (x) => x + 1)
immutableB = immutableA.updateIn(['a', 'b'], (x) => x + 1)

immutableB = immutableA.merge(immutableC)

// Map检索
data = Immutable.fromJS({a: 1, b: 2})
data.filter((value, key) => value is 1)

// 判断属性是否存在要先转换成JS的原生对象
immutableData = Immutable.fromJS({key: null})
immutableData.has('key')

// 分别获取Key的数组和Value的数组
immutableData.keySeq()
immutableData.valueSeq()

// 在React中使用jQuery
var BootstrapModal = React.createClass({
    componentDidMount: function(){
      var rootElem = this.refs.root;// 获得真实的浏览器DOM节点
      // 调用jQuery方法，将节点内容转换为模态对话框
      $(rootElem).modal({backdrop: 'static', keyboard: false, show: false});
      // 绑定jQuery事件，注意到root组件并没有在React中绑定事件
      $(rootElem).on('hidden.bs.modal', this.handleHidden)
    },
    componentWillUnmount: function(){
      $(this.refs.root).off('hidden.bs.modal', this.handleHidden)
    },
    close: function() {
        $(this.refs.root).modal('hide');
    },
    open: function() {
        $(this.refs.root).modal('show');
    },
    render: function() {
        var confirmButton = null;
        var cancelButton = null;
        if (this.props.confirm) {
            confirmButton = (
                <BootstrapButton
                    onClick={this.handleConfirm}
                    className='btn-primary'
                >
                    {this.props.confirm}
                </BootstrapButton>
            )
        }
        if (this.props.cancel) {
            cancelButton = (
                <BootstrapButton
                    onClick={this.handleCancel}
                    className='btn-default'
                >
                {this.props.cancel}
                </BootstrapButton>
            )
        }
        return (
            <div className='modal fade' ref='root'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' onClick={this.handleCancel}>&times;</button>
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="modal-body">{this.props.children}</div>
                        <div className="modal-footer">
                            {cancelButton}
                            {confirmButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    handleCancel: function() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    },
    handleConfirm: function() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    },
    handleHidden: function() {
        if (this.props.onHidden) {
            this.props.onHidden();
        }
    }
    
})

// 在jQuery中使用React
// 声明一个HTML标签(通常是div)作为React组件的容器
// 在初始化阶段调用ReactDOM.render()将组件挂接到该标签下
ReactDOM.render(
    React.createElement(HelloComponent, null),
    document.getElementById('reactContainer')
)

// 使用onEnter实现与Redirect相同的功能
<Route path='inbox' component={Inbox}>
    <Route path='messages/:id' onEnter={({params}, replace) => replace('/messages/${params.id}')}></Route>
</Route>

// 使用onEnter实现认证功能
const requireAuth = (nextState, replace) => {
    if (!auth.isAdmin()) {
        // 如果不是管理员则跳转到主页
        replace({pathname: '/'})
    }
}
export const AdminRoutes = () => {
    return (
        <Route path='/admin' component={Admin} onEnter={requireAuth} />>
    )
}

// BrowserHistory实现动态路由切换
import { Router, Route, browserHistory } from 'react-router'
render((
    <Router history={ browserHistory }>
        <Route path='/' component={App}/>
    </Router>
), document.getElementById('app'))
doRouteSwitch() {
    const path='/repos/${username}/${repo}';
    browserHistory.push(path)
}

// 利用context机制传递router对象
export default React.createClass({
    // 从 context 中取得 router 对象
    contextTypes: {
        router: React.PropTypes.object
    },
    doRouteSwitch(event) {
        // ...
        this.context.router.push(path);
    }
})

