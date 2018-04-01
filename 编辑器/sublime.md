## sublime Text3 插件的安装

### 安装 Package Ctrol

使用 ctrl + ～ 打开控制台，输入以下代码：
`import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())`

### 插件安装

1. 在Sublime Text中，按下Command+Shift+P调出命令面板; 
2. 输入install 调出 Install Package 选项并回车; 
3. 输入搜索关键字，并在列表中选择要安装的插件后回车即可安装；

### 推荐插件

