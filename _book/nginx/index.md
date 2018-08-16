## Nginx配置场景

* 代理服务
* 动态缓存
* 动静分离
* 负载均衡
* Nginx与LUA的开发

## 中间件架构

* 应用层的安全防护
	* 对sql的注入防攻击
	* 对请求的访问控制
	* 对请求的频率控制
	* 对防爬虫
* 性能优化
	* http性能压测
	* 性能瓶颈分析
	* 系统性能优化
	* 基于Nginx的性能配置优化

## 基础

环境要求
Centos7.0以上版本，64位，2core，256M
* 确认系统网络可用
* yum可用
* 确认关闭iptables规则:iptables -F ; iptables -t nat -F
* 确认停用selinux: setenforce 0;

yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim

cd /opt
mkdir app download logs work backup

### 快速安装


### 配置语法
### 默认模块
### log
### 访问限制
#### HTTP的请求和连接
#### 请求限制与连接限制
#### access模块配置语法
#### 请求限制局限性
#### 基本安全认证
#### auth模块配置语法
#### 安全认证局限性

## 场景

### 静态资源web服务
### 代理服务
### 负载均衡
### 缓存服务

## 深度

### 动静分离
### rewrite规则
### 进阶模块配置
### HTTPS服务
### Nginx与LUA的开发

## 架构

### 常见问题
### Nginx中间件性能优化
### Nginx与安全
### 新版本特性
### 中间件架构设计


















