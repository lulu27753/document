# JS复制内容到剪贴板

## 两种方式

* 第三方方式：[clipboard.js](https://github.com/zenorocha/clipboard.js)
* 原生方法：document.execCommand()
* react库：react-copy-to-clipboard

[clipboard官方网站](https://clipboardjs.com/)

## 第三方库使用方式

**直接引用**`<script src="dist/clipboard.min.js"></script>`

**包引用**`npm install clipboard --save` `import Clipboard from 'clipboard';`

### 使用

#### 从输入框复制

```html
<input id='demoInput' value='hello world' >
<button class='btn' data-clipboard-target='demoInput'>点我复制</button>
```

```javascript
import Clipboard from 'clipboard';
const btnCopy = new Clipboard('btn');
```

#### 直接复制

直接从变量中取值

```vue
<button class='btn' :data-clipboard-text='copyValue'>点我复制</button>
```

```javascript
import Clipboadrd from 'clipboard';
const btnCopy = new Clipboard('btn');
this.copyValue = 'hello world';
```

### 事件

在处理函数中加入以下回调函数：

```javascript
// 复制成功后执行的回调函数
clipboard.on('success', function(e) {
    console.info('Action:', e.action);// 动作名称，比如：Action：copy
    console.info('Text:', e.text);// 内容，比如：Text: hello world
    console.info('Trigger:', e.trigger);// 返回触发的元素：比如：<button class='btn' :data-clipboard-text='copyValue'>点我复制</button>
    e.clearSelection();// 清除选中内容
})；

// 复制失败后执行的回调函数
clipboard.on('error', function(e) {
    console.error('Action', e.action);
    console.error('Trigger', e.trigger);
});
```

## 原生方法

可以允许运行命令来操作可编辑区域的内容，注意，是可编辑区域。
定义：bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)

方法返回一个 Boolean 值，表示操作是否成功。
* aCommandName ：表示命令名称，比如： copy, cut 等（更多命令见命令）；
* aShowDefaultUI：是否展示用户界面，一般情况下都是 false；
* aValueArgument：有些命令需要额外的参数，一般用不到；

### 使用

#### 从输入框复制

现在页面上有一个 `<input>` 标签，我们想要复制其中的内容:

```html
<input id='demoInput' value='hello world'>
<button id='btn'>点我复制</button>
```

```javascript
const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
    const input = document.querySelector('#demoInput');
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
})
```

#### 其他地方复制

有的时候页面上并没有 `<input>` 标签，我们可能需要从一个 `<div>` 中复制内容，或者直接复制变量。
但是 execCommand() 方法的定义中提到，它只能操作可编辑区域，也就是意味着除了 `<input>`、`<textarea>` 这样的输入域以外，是无法使用这个方法的。
这时候我们需要曲线救国。

```html
<button id='btn'>点我复制</button>
```

```javascript
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    const input = document.createElement('input')
    document.body.appendChild(input);
    input.setAttribute('value', '听说你想复制我')；
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
    document.body.removeChild(input)
})
```
这个曲线救国在移动端iOS调试时会有坑

#### 遇到的坑

1. 点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起
 知道了抖动是由于什么产生的就比较好解决了。既然是拉起键盘，那就是聚焦到了输入域，那只要让输入域不可输入就好了，在代码中添加 input.setAttribute('readonly', 'readonly'); 使这个 <input> 是只读的，就不会拉起键盘了。

2. 无法复制:这个问题是由于 input.select() 在ios下并没有选中全部内容，我们需要使用另一个方法来选中内容，这个方法就是 input.setSelectionRange(0, input.value.length);。

```javascript
const btn = document.querySelector('#btn');
btn.addEventListener('click',() => {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', 'hello world');
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
    document.body.removeChild(input);
})
```