# VSCdoe+插件 使用配置记录

## HTML 中 CSS Class 智能提示

1.安装插件：`HTML CSS Support`

2.设置中添加以下代码：

```json
"editor.parameterHints": true,
"editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true

```

## 查看 HTML 样式在 CSS 中的定义

安装插件：`CSS Peek`，当你在 HTML 文件中右键单击选择器时，选择“ `Go to Definition` 和 `Peek definition` ”选项，它便会给你发送样式设置的 `CSS` 代码。

## 不同代码文件 Tab 键设定

设置中添加以下代码：

```json

"[html]": {
    "editor.tabSize": 4
},
"[css]": {
    "editor.tabSize": 4
},
"[javascript]": {
    // 按 "Tab" 时插入空格。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
    "editor.insertSpaces": true,
    // 一个制表符等于的空格数。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
    "editor.tabSize": 2
},
"[typescript]": {
    "editor.tabSize": 2
}

```

## 标题栏显示文件全路径名

设置中添加以下代码：

```json
"window.title": "${activeEditorLong}"
```

## 文件自动保存

设置中添加以下代码：

```json
"files.autoSave": "onFocusChange"
```