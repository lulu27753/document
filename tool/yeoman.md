## 环境准备

Node | npm | git

## 安装

```bash
npm install -g yo # 安装 Yeoman
yo --version
npm install -g generator-fountain-webapp # 安装 Yeoman 生成器，目前可用的生成器超过了 3500 个
yo  # 选择 Install a generator 来搜索发布的生成器
```

## 使用生成器搭建我们的app

```bash
mkdir mytodo && cd mytodo
yo # 选中 Fountain Webapp，按回车 enter 运行生成器
```

FountainJS 生成器提供一些选项来匹配你的喜好:
* 框架（React，Angular2，Angular1）
* 模块管理工具（Webpack，SystemJS，none with bower）
* JavaScript预处理器（babel，TypeScript，none）
* css 预处理器（Sass，Less，none）
* 三个模板app（a landing page，hello world，TodoMVC）


## 生成器生成的目录结构

* `src`： web应用的父目录

* `conf`：配置文件及第三方工具的父目录（Bowersync，Webpack，Gulp，karma）
	* Bowersync: 会监测你的文件的变化然后自动加载(通过配置 gulpfile.js 中的 gulp tasks 以及 gulp_tasks/browsersync.js 中的 Browsersync 实现)

* `gulp_tasks` 和 `gulpfile.js`：构建任务

* `.babelrc，package.json，node_modules`：配置以及所需依赖包

* `.gitattributes` 和 `.gitignore：git`的配置

