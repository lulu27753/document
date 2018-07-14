## JSON Web Token

JWT 本质上是由头部、载荷与签名组成的由点连接的base64字符串

### 头部

描述关于该JWT的最基本的信息，例如其类型以及签名所用的算法等


### 载荷

JWT的标准定义的五个字段：
	1）iss: 该JWT的签发者
	2）sub: 该JWT所面向的用户
	3）aud: 接收该JWT的一方
	4）exp(expires): 什么时候过期，这里是一个Unix时间戳
	5）iat(issued at): 在什么时候签发的


### 签名

即对“头部.载荷”通过密钥进行加密（HS256）

这个只是为了防止头部和载荷会被修改，但是头部和载荷由于没有进行加密，只是进行了base64转码了，所以会信息暴露，不要在JWT中加入任何敏感数据。

## 适用场景

* 向Web应用传递一些非敏感信息，如完成加好友的操作，下订单等
* 设计用户认证和授权系统
* 实现Web应用的单点登录

## 用户认证

用户认证(Authentication)：让用户登录，并且在接下来的一段时间内让用户访问网站时可以使用其账户，而不需要再次登录的机制
用户授权(Authorization)：规定并允许用户使用自己的权限，例如发布帖子、管理站点等


1. POST请求 发送 ”用户名 + 密码“
2. 后端和数据库核对用户名和密码
3. 核对正确，后端将用户ID及首部拼接成JWT作为该请求Cookie的一部分返回给用户(HttpOnly属性来防止Cookie被JavaScript读取，从而避免跨站脚本攻击（XSS攻击）)
4. 每次请求后端都会接收到含有jwt的Cookie从而检查其有效性(例如，检查签名是否正确；检查Token是否过期；检查Token的接收方是否是自己（可选）)
5. 确认JWT有效，则在payload中读取用户的ID值，从而从数据库取出该用户ID所请求的值响应

## 资源

[JSON Web Token - 在Web应用间安全地传递信息](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=207559330&idx=1&sn=de82628f2073d6f04d93430ae7c8ab83&scene=21#wechat_redirect)

[使用JSON Web Token设计单点登录系统](https://mp.weixin.qq.com/s/7Ze6P77X4iFCUEz9LQHxrQ)
