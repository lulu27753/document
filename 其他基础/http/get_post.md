

## HTTP Post 和 GET 的区别

根据 HTTP 规范，GET 用于信息获取，而且应该是 安全的和 幂等的。所谓安全的意味着该操作用于获取信息而非修改信息。换句话说，GET 请求一般不应产生副作用。幂等的意味着对同一 URL 的多个请求应该返回同样的结果。完整的定义并不像看起来那样严格。从根本上讲，其目标是当用户打开一个链接时，她可以确信从自身的角度来看没有改变资源。比如，新闻站点的头版不断更新。虽然第二次请求会返回不同的一批新闻，该操作仍然被认为是安全的和幂等的，因为它总是返回当前的新闻。反之亦然。POST 请求就不那么轻松了。POST 表示可能改变服务器上的资源的请求。仍然以新闻站点为例，读者对文章的注解应该通过 POST 请求实现，因为在注解提交之后站点已经不同了

* 提交数据：GET提交的数据会在地址栏中显示出来，而POST提交，地址栏不会改变
* 数据大小：**HTTP协议**没有对传输的数据大小进行限制，也没有对URL长度进行限制。
    * GET：特定浏览器和服务器对URL长度有限制，例如 IE对URL长度的限制是2083字节(2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持。因此对于GET提交时，传输数据就会受到URL长度的限制。
    * POST:由于不是通过URL传值，理论上数据不受限。但实际各个WEB服务器会规定对post提交数据大小进行限制，Apache、IIS6都有各自的配置。
* 安全性：POST比GET的安全性高,正确选择使用GET和POST，那么GET是安全的。
    * GET不能传送加密信息和修改数据,只用来传输不重要的读操作
    * 通过GET提交数据，用户名和密码将明文出现在URL上，因为(1)登录页面有可能被浏览器缓存，(2)其他人查看浏览器的历史纪录，那么别人就可以拿到你的账号和密码了
    * 除此之外，使用GET提交数据还可能会造成Cross-siterequest forgery攻击
* Content-type设置
    * post: application/x-www-form-urlencoded
    * soap: text/xml

注：soap是http post的一个专用版本，遵循一种特殊的xml消息格式

### PUT

用于传输文件，由于不带验证机制，存在安全性问题。若配合Web应用程序的验证机制，或架构设计采用REST(REpresentational State Transfer, 表征状态转移)标准的同类Web网站，可能会开放使用PUT方法。

### HEAD

和GET方法一样，只是不返回报文主体部分，用于确认URI的有效性及资源更新的日期时间等

### DELETE

用于删除文件，和PUT一样不带验证机制

### OPTIONS

用来查询针对请求URI指定的资源支持的方法：Allow: GET, POST, HEAD, OPTIONS

如果不是访问特定资源而是对服务器本身发起请求，可以用一个`*`来代替请求URL

`OPTIONS * HTTP/1.1`

### TRACE

让服务器将之前的请求通信环回给客户端的方法，客户端通过该方法可以查询发送出去的请求是怎样被加工/篡改的。容易引发XST（Cross-Site Tracing）攻击

### CONNECT

要求用隧道协议连接代理，主要使用SSL|TLS把通信内容加密后经网络隧道传输
* SSL: 安全套接层 Secure Sockets Layer
* TLS：传输层安全 Transport Layer Security

```bash
CONNECT 代理服务器名：端口号 HTTP版本
```

### 持久连接

也称为HTTP keep-alive 或 HTTP connection reuse，只要任意一端没有明确提出断开连接，则保持TCP连接状态。减少了TCP连接的重复建立和断开造成的额外开销，减轻了服务器端的负载。同时，减少开销的时间，使得WEB页面的显示速度也提高了。

持久连接使得多数请求以管线化方式发送成为可能，不用等待响应亦可直接发送下一个请求，即可实现同时并行发送多个请求。

### 使用cookie的状态管理

cookie会根据从服务器端发送的响应报文内的Set-Cookie首部字段信息，通知客户端保存Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入Cookie值后发出去。
服务器端发现客户端发送过来的cookie后，会去检查究竟是从哪个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息

### 内容编码

编码提升传输速率
内容编码指明应用在实体内容上的编码格式，并保持实体信息原样压缩。内容编码后的实体由客户端接收并负责解码。
* gzip（GUN zip)
* compress (UNIX 系统的标准压缩)
* deflate（zlib)
* identity (不进行编码)

分块传输编码：通过把请求编码的实体主体分割成多块从而让浏览器逐步显示页面

### 发送多种数据

MIME(Multipurpose Internet Mail Extentions,多用途因特网邮件拓展)机制，允许邮件处理文本、图片、视频等多个不同类型的数据

多部分对象集合：通常在图片或文件上传时使用，使用时需要在首部字段里加上Content-type
* multipart/form-data: web表单上传
* multipart/byteranges：状态码206，响应报文包含多个范围的内容

### 范围请求

指定下载的实体范围，可以从之前下载中断处恢复下载

指定首部字段Range来指定资源的byte范围

* 响应范围请求：返回206，响应会在首部字段Content-Type标明multipart/byteranges后返回响应报文
* 无法响应范围请求：返回200，OK，和完整的实体内容

### 内容协商

指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为合适的资源。
内容协商判断基准：
* Accept
* Accept-Charset
* Accept-Encoding
* Accept-Language
* Content-Language

## 状态码

### 状态码类别

* 1XX: 信息性状体码 接收的请求正在处理
* 2XX: 成功状态码 请求正常处理完毕
* 3XX: 重定向状态码 需要进行附加操作以完成请求
* 4XX: 客户端错误状态码 服务器无法处理请求
* 5XX: 服务器错误状态码 服务器处理请求出错


### 14种常见状态码

当返回301、302、303，几乎所有的浏览器都会把POST改为GET，并删除请求报文内的主体，之后请求会自动重新发送

* 200 OK: 请求被正常处理
* 204 NO Content: 请求处理成功，但无资源可返回；在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用
* 206 Partial Content: 成功处理范围请求
* 301 Moved Permanently: 永久性重定向，表示请求的资源已被分配了新的URI。当指定资源路径的最后忘记添加‘/’，就会返回该状态码
* 302 Found：临时性重定向，表示请求的资源存在另一个URI；当替代303使用时，表示客户端应当采用GET方法获取资源
* 304 NOT Modified: 允许请求访问资源，但未满足条件（指请求首部包含If-Match，If-Modified-Since,If-None-Match, If-Range,If-Unmodified-Since），响应不包含任何响应的主体部分。和重定向没有关系
* 400 Bad Request: 请求报文中存在语法错误，需修改请求内容后再次发送请求
* 401 Unauthorized: 表示发送的请求需要有通过HTTP认证（BASIC认证、DIGEST认证）的认证信息。响应必须包含一个适用于被请求资源的WWW-Authenticate首部用以质询(challenge)用户信息
* 403 Forbidden: 不允许访问那个资源
* 404 Not Found: 服务器上没有请求的资源。也可以在服务器端拒绝请求且不想说明理由时使用
* 500 Internal Server Error: 服务器端在执行请求时发生了错误
* 503 Service Unavailable: 表明服务器暂时处于超负载或正在进行停机维护，无法处理请求。最好写入Retry-After首部字段再返回给客户端

## 服务器

### 用单台虚拟主机实现多个域名

单台服务器内托管了多个域名，当收到发送的IP请求时，需要知道需要访问的是哪个域名，因此在发送HTTP请求时，必须在HOST首部内完整指定主机名或域名的URI

### 通信数据转发程序：代理、网关、隧道

通信数据转发程序可以将请求转发给通信线路上的下一站服务器，并且能接收从那台服务器发送的响应再转发给客户端

#### 代理

有转发功能的应用程序=
每次通过代理服务器转发请求和响应时，会追加写入Via首部信息
通过设置组织内部的代理服务器可做到针对特定的URI访问的控制
利用“缓存技术”减少网络带宽的流量
组织内部针对特定网站的访问控制
以获取访问日志为主要目的

#### 网关

转发其他服务器通信数据的服务器
利用网关可以由HTTP请求转化为其他协议通信，利用网关能提高通信的安全性

#### 隧道

在相隔甚远的客户端和服务器两者之间进行中转，并保持双方通信连接的应用程序
隧道可按要求建立起一条与其他服务器的通信线路，届时使用SSL等加密手段进行通信

## HTTP 首部

HTTP 首部字段
* 通用首部字段
	* Cache-Control: 控制缓存的行为
	* Connection：逐跳首部、连接的管理
	* Date：创建报文的日期时间
	* Pragma：报文指令
	* Trailer：报文末端的首部一览
	* Transfer-Encoding：指定报文主体的传输编码方式
	* Upgrade：升级为其他协议
	* Via：代理服务器的相关信息
	* Warning：错误通知
* 请求首部字段
	* Accept: 用户代理可处理的媒体类型
	* Accept-Charset: 优先的字符集
	* Accept-Encoding: 优先的内容编码
	* Accept-Language: 优先的语言（自然语言）
	* Authorization: Web认证信息
	* Expect: 期待服务器的特定行为
	* From: 用户的电子邮箱地址
	* Host: 请求资源所在服务器
	* If-Match: 比较实体标记(ETag)
	* If-None-Match: 比较实体标记
	* If-Modified-Since: 比较资源的更新时间
	* If-Unmodified-Since: 比较资源的更新时间
	* If-Range: 资源未更新时发送实体Byte的范围请求
	* Max-Forwards: 最大传输逐跳数
	* Proxy-Authorization: 代理服务器要求客户端的认证信息
	* Range: 实体的字节范围请求
	* Referer: 对请求中URI的原始获取方
	* TE: 传输编码的优先级
	* User-Agent: HTTP客户端程序的信息
* 响应首部字段
	* Accept-Ranges: 是否接受字节范围请求
	* Age: 推算资源创建经过时间
	* ETag: 资源的匹配信息
	* Location: 令客户端重定向至指定URI
	* Proxy-Authenticate: 代理服务器对客户端的认证信息
	* Retry-After: 对再次发起请求的时机要求
	* Server: HTTP服务器的安装信息
	* Vary: 代理服务器缓存的管理信息
	* WWW-Authenticate: 服务器对客户端的认证信息
* 实体首部字段
	* Allow: 资源可支持的HTTP方法
	* Content-Encoding: 实体主体适用的编码方式
	* Content-Language: 实体主体的自然语言
	* Content-Length: 实体主体的大小
	* Content-Location: 替代对应资源的URI
	* Content-MD5: 实体主体的报文摘要
	* Content-Range: 实体主体的位置范围
	* Content-Type: 实体主体的媒体类型
	* Expires: 实体主体过期的日期时间
	* Last-Modified: 资源的最后修改日期时间
* RFC4229 HTTP Header Field Registrations
	* Cookie: 请求首部字段，服务器接收到的Cookie信息
	* Set-Cookie: 响应首部字段，开始状态管理所使用的Cookie信息
		* NAME=VALUE：赋予Cookie的名称和值
		* expires=DATE: Cookie的有效期
		* path=PATH: 将服务器上的文件目录作为Cookie的适用对象(若不指定则默认为创建Cookie的服务器的域名)
		* domain=域名: 作为Cookie适用对象的域名(若不指定则默认为创建Cookie的服务器的域名)
		* Secure: 仅在HTTPS安全通信时才会发送Cookie
		* HttpOnly: 加以限制，使Cookie不能被JavaScript脚本访问
			* 使用JS的document.cookie无法读取附加该属性后的
	* Content-Disposition:
* 逐跳首部(Hop-by-hop Header)
	* Connection
	* Keep-Alive
	* Proxy-Authenticate
	* Proxy-Authorization
	* Trailer
	* TE
	* Transfer-Encoding
	* Upgrade
* 端到端首部(End-to-end Header)
	* 除了8个逐跳首部外，其他所有字段都属于端到端首部
* 其他首部字段：HTTP首部字段是可以自行拓展的
	* X-Frame-Options：防止点击劫持攻击
		* DENY: 拒绝
		* SAMEORIGIN：仅同源域名下的页面匹配时许可
	* X-XSS-Protection：防止跨站脚本攻击，用于控制浏览器XSS防护机制的开关
		* 0: 将XSS过滤设置成无效状态
		* 1: 将XSS过滤设置成有效状态
	* DNT：拒绝个人信息被收集

若首部字段重复了，根据浏览器内部处理逻辑的不同，结果可能不一致。有些会优先处理第一次出现的首部字段，有些则会优先处理最后出现的首部字段。


## HTTP请求协议格式

```java
<request line>          // http请求行,用来说明请求类型(method)、要访问的资源(request-URI)以及使用的HTTP版本
<headers>               // http请求消息报头,说明服务器要使用的附加信息
<blank line>            // 回车换行
[<request-body>]        // http请求正文
```

```bash
POST /index.html HTTP/1.1 # 请求报文
Host: hackr.jp  # 请求首部字段
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 16
If-Modified_Since：Thu, 12Jul 2012 07:30:00 GMT # 仅返回2012年7月12日7点30分以后更新过的index.html页面资源，如果未有内容更新，则以304 Not Modified作为响应返回

name=ueno&age=37 # 内容实体
```

## HTTP响应协议格式

```java
<status line>          // http响应状态行,通过提供一个状态码(status code)来说明所请求的资源情况。及原因短语（reason-phrase）
<headers>              // http响应消息报头
<blank line>           // 回车换行
[<response-body>]      // http响应正文
```
rank_level
```bash
HTTP/1.1 200 OK		# 协议版本 + 状态码 + 用以解释状态码的原因短语 
Date: Tue, 10 Jul 2012 06:50:15 GMT # 可选的响应首部字段
Content-Length: 362
Content-Type: text/html

<html> # 资源实体的主体（entity-body）

```


## 网络基础 TCP | IP

通常使用的网络是在TCP|IP协议族的基础上运作的，而HTTP属于其中的一个子集

* 协议：通信，双方必须基于相同的方法，比如如何探测到通信目标、由哪一边先发起通信、使用哪种语言进行通信、怎样结束通信等规则都需要事先确定。不同的硬件、操作系统之间的通信等。
* TCP|IP：是在IP协议的通信过程中，使用到的协议族的统称
* TCP|IP分层：
	* 应用层：FTP | DNS | HTTP | websocket
	* 传输层：提供可靠的字节流服务，如TCP | UDP 
	* 网络层：在众多的选项中选择一条传输路线，如IP
	* 数据链路层：网络硬件部分，包括控制操作系统、硬件的设备驱动、网卡、光纤

### IP协议

负责把各种数据包传送给对方
* IP地址：指明了节点被分配到的地址
* MAC地址：指网卡所属的固定地址
	* ARP：是一种用以解析地址的协议，根据通信方的IP地址就可以反查出对应的MAC地址

### TCP

采用三次握手准确无误地将数据送达目标处
* SYN(synchronize)
* ACK(acknowledgement)

### UDP

* UDP是无连接的
* TCP保证数据正确性，UDP可能丢包
* TCP保证数据顺序，UDP不保证
* TCP连接只能是点到点的，UDP支持一对一，一对多，多对一和多对多的交互通信

### DNS 

提供域名到IP地址之间的解析服务，或逆向从IP地址反查域名的服务


### URI 和 URL

URI：Uniform Resource Identifier, 统一资源标识符，用字符串标识某一互联网资源
URL：Uniform Resource Locator，统一资源定位符，表示资源的地点（互联网上所处的位置）
URL 是 URI 的子集

`http://user:pass@www.example.com:80/dir/index.html?uid=1#ch1`
协议方案名 + 登录信息（认证）+ 服务器地址 + 服务器端口号 + 带层次的文件路径 + 查询字符串 + 片段标识符


### HTTP | HTTPS | WebSocket 的区别

HTTPS是HTTP下加入SSL || TLS层（加密/身份验证层），需要到ca申请证书，端口是443。
HTTP是无状态的超文本传输协议，端口是80


websocket是HTML5提出的一套补缺HTTP链接中不能持久链接的协议。

HTTP协议建立的“长连接”是“伪长连接”，只是靠服务器不断循环实现了所谓的长连接效果。在连接后的过程中，服务器都会不停的链接与断开，数据头信息不停重复的发送，浪费宽带，信息交换的效率低下。

websocket服务器主动推送，只要有数据就推送到请求方。
基于Node.js编写的一个Socket.IO是一个开源实现WebSocket的库，它通过node.js实现服务端的同时，也提供了客户端js库，socket.io支持事件触发为基础进行的双向数据通信

与WebSocket比较

 相同点：
 1.都是基于TCP的应用层协议。
 2.都使用Request/Response模型进行连接的建立。
 3.在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码。
 4.可以在网络中传输数据。

 不同点：
 1.WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用。
 2.WS的连接不能通过中间人来转发，它必须是一个直接连接。
 3.WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据。
 4.WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息。
 5.WS的数据帧有序


### HTTPS

HTTPS = 数据加密 + 网站认证 + 完整性验证 + HTTP

* 通过证书等信息确认网站的真实性
* 建立加密的信息通道
* 数据内容的完整性

CA中心发布的数字证书通过对称加密和非对称加密对我们网上传输的信息进行加密

* 对称加密：加密和解密使用同一个密钥
* 非对称加密：
	* 公钥加密：发给查看网站的所有人
	* 私钥解密：只有网站服务器自己拥有



## HTTP 的缺点

* 通信使用明文（不加密），内容可能会被窃听
* 不验证通信方的身份，因此有可能遭遇伪装
* 无法证明报文的完整性，所以有可能已遭篡改





















