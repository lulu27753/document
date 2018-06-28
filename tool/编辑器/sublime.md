## 高级快捷键

Command + D 选中一个单词
Command + L 选中一行
Command + A 全选
Ctrl + Command + M 选中括号内所有内容 (编写CSS或JS时非常实用)
Command 按住Command键再点击想选中的行
Command + Ctrl + G (选中部分文本时) 按此键选中所有相同文本
Command + D (选中部分文本时) 直接选中下一次出现的该文本
CSS按字母顺序排序：F5
实现单词而不是字符间的跳转：按住Alt键的同时使用方向键
跳转到这行的另一端：按住Cmd键的同时使用方向键
跳转到指定行：Ctrl+G，然后输入行号
Ctrl+T 左右字母互换
Ctrl+K+U 转换大写
Ctrl+K+L 转换小写


## 命令面板

调出面板：Command + Shift + P
重命名文件：Rename
设置文件为HTML语法: Syntax HTML
插入代码片段: Snippet

## 文件爬虫

Command + R可以列出文档中所有的CSS选择器

## 插件

### 安装 Package Ctrol

使用 ctrl + ～ 打开控制台，输入以下代码：
`import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())`

### 插件安装

1. 在Sublime Text中，按下Command+Shift+P调出命令面板; 
2. 输入install 调出 Install Package 选项并回车; 
3. 输入搜索关键字，并在列表中选择要安装的插件后回车即可安装；

### 推荐插件

DocBlockr: 多行注释插件
SideBarEnhancements：增强侧边栏
PackageResourceViewer
MarkdownEditing

## 其他

* 将含下划线的字符串批量替换为驼峰命名法格式的字符串







