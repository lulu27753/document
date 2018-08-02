## 安装卸载

```bash
sudo npm install gitbook-cli -g # 安装
gitbook --version # 查看版本信息
npm update gitbook-cli -g # 查看版本
sudo npm uninstall gitbook-cli -g # 卸载
```

## 初始化

```bash
gitbook init # 只支持生成两级目录
# warn: no summary file in this book
# info: create README.md
# info: create SUMMARY.md
# info: initialization is finished
```
- README.md: 项目的介绍
- SUMMARY.md: GitBook 的目录结构


## SUMMARY.md

```markdown
# Summary

* [项目简介](README.md)
* [快速开始](docs/快速开始.md)
 * [环境搭建](docs/环境搭建.md)
 * [简单使用](docs/简单使用.md)
* [学入学习](docs/深入学习) 
```

## 启动服务

```bash
gitbook serve # http://127.0.0.1:4000/ 
```























## 资源

[Gitbook 命令行工具](https://www.cnblogs.com/QianChia/p/8537180.html)