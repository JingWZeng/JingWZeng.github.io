---
title: HTTP
date: 2021-09-24 11:12:50
author: zJingW
categories: HTTP
description: 《图解HTTP》的总结
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109032014297.png
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109032014297.png
tags: 
 - 前端
 - HTTP
---
### 传输流程

![image-20210924094205809](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109240942964.png)

### 三次握手

目的是为了保证客户端和服务端各自的可分发，就是为了确保对方是否确认收到，连接是否成功，也就是为啥`TCP`是可靠的连接

简要的说明就是利用`TCP`的标志`SYN`和`ACK`。发送端首先发送一个带`SYN`标志的数据包给对方。接收端收到后，回传一个带有`SYN/ACK`标志的数据包以示传达确认信息。最后，发送端再回传一个带`ACK`标志的数据包，代表“握手”结束。若在握手过程中某个阶段莫名断。`TCP` 协议会再次以相同的顺序发送相同的数据包。

![image-20210924094620148](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109240946219.png)

### http无状态保存

`http`协议自身不具备保存之前发送的请求和响应的功能。如果为了实现保存状态的功能，可以利用cookie技术，`cookie`与`http`配合，就可以管理状态了。

![image-20210924100144178](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241001237.png)

### URL和URI

`URL`统一资源定定位符，也就是在浏览器中输入的地址，`URI`统一资源标识符，用来标识服务器中具体的某一个资源，也就是请求体内容。`URI`包含`URL`

### HEAD

`HEAD`方法和`GET`方法一样，只是不返回报文主体部分。用于确认`URI`的有效性及资源更新的日期时间等。

### DELETE

`DELETE` 方法用来删除文件，是与`PUT`相反的方法(上传文件)。`DELETE`方法按请求`URI`删除指定的资源。但是，`HTTP/1.1`的`DELETE`方法本身和`PUT`方法一样不带验证机制，所以一般的`Web`网站也不使用`DELETE`方法。当配合`Web`应用程序的验证机制，或遵守`REST`标准时还是有可能会开放使用的。

###  OPTIONS：询问支持的方法

 `OPTIONS`方法用来查询针对请求`URI`指定的资源支持的方法。

![image-20210924101436881](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241014932.png)

### TRACE：追踪路径

TRACE 方法是让 Web 服务器端将之前的请求经过的路径返回的发放。发送请求时，在`Max-Forwards`首部字段中填入数值，每经过一个服务器端就将该数字减`1`，当数值刚好减到`0 `时，就停止继续传输，最后接收到请求的服务器端则返回状态码`200 OK`的响应。客户端通过 `TRACE`方法可以查询发送出去的请求是怎样被加工修改/ 篡改的。这是因为，请求想要连接到源目标服务器可能会通过代理中转，`TRACE`方法就是用来确认连接过程中发生的一系列操作。但是，`TRACE`方法本来就不怎么常用，再加上它容易引发`XST`（Cross-Site Tracing，跨站追踪）攻击，通常就更不会用到了。

![image-20210924101739103](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241017163.png)

### CONNECT：要求用隧道协议连接代理

`CONNECT`方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行`TCP`通信。主要使用`SSL`（Secure Sockets Layer，安全套接层）和`TLS`（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输。`CONNECT`方法的格式如下所示。

```CONNECT 代理服务器名:端口号 HTTP版本```

### http1.1新增的持久连接alive

持久连接就是建立一次`TCP`连接，只要任意一段没有断开连接，就可以保持`TCP`的连接，可以在这个连接中发送多次的`http`请求。在`http1.1`中，所有的连接默认都是持久连接。

![image-20210924102855479](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241028553.png)

### 管线化

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了

![image-20210924103216826](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241032880.png)



### Cookie

`Cookie`会根据从服务器端发送的响应报文内的一个叫做`Set-Cookie`的首部字段信息，通知客户端保存`Cookie`。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 `Cookie`值后发送出去。服务器端发现客户端发送过来的`Cookie`后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息。

![image-20210924103615311](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241036362.png)

![image-20210924103624559](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241036604.png)

### 服务端两种编码方式

+ 压缩

`gzip`压缩之后发给客户端，客户端解压缩该实体。属于内容编码的一种，内容编码指明应用在实体内容上的编码格式，并报出实体信息原样的压缩。

![image-20210924104947519](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241049574.png)

+ 分割

在`HTTP`通信过程中，请求的编码实体资源尚未全部传输完成之前，浏览器无法显示请求页面。在传输大容量数据时，通过把数据分割成多块，能够让浏览器逐步显示页面。这种把实体主体分块的功能称为分块传输编码`Chunked TransferCoding`

![image-20210924105147859](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241051913.png)

### 范围请求

比如一个图片下载中断，从中断处开始返回数据给客户端，就是范围请求。用`Range`来指定`byte`的范围

`Range: bytes = 5001-10000`

针对范围请求，响应会返回状态码为206 `Partial Content`(部分内容),对于多重范围的范围请求，响应会在首部字段`Content-Type`标明`multipart/byteranges`后返回响应报文。如果服务器端无法响应范围请求，则会返回状态码`200 OK`和完整的实体内容

### 内容协商

内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字符集、编码方式等作为判断的基准。比如需要显示中文还是英文。

`Accept`

`Accept-Charset`

`Accept-Encoding`

`Accept-Language`

`Content-Language`

### 状态码

|      |       类别       |          原因短语          |
| :--: | :--------------: | :------------------------: |
| 1XX  |   信息性状态码   |     接收的请求正在处理     |
| 2XX  |    成功状态码    |      请求正常处理完毕      |
| 3XX  |   重定向状态码   | 需要进行附加操作以完成请求 |
| 4XX  | 客户端错误状态码 |     服务器无法处理请求     |
| 5XX  | 服务器错误状态码 |     服务器处理请求出错     |
+ 204 No Content

![image-20210924140001523](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241400622.png)

+ 206 Partial Content 

  该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

![image-20210924140040466](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241400521.png)

+ 301 Moved Permanently(永久性的) 永久重定向

![image-20210924140247109](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241402164.png)

+ 302 Found 临时重定向

![image-20210924140353652](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241403706.png)

+ 303 See Other

表示由于请求对应的资源存在另一个`url`,应该使用`get`方向定向获取请求的资源，与302有相同的功能，但是303明确表示客户端应该使用`get`方法获取

![image-20210924140432027](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241404090.png)

+ 304 Not Modified

该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 `3XX`类别中，但是和重定向没有关系。附带条件的请求是指采用`GET`方法的请求报文中包含`If-Match`，`If-Modified-Since`，`If-None-Match`，`If-Range`，`If-Unmodified-Since` 中任一首部。

![image-20210924140830269](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241408325.png)

+ 307 Temporary(临时的) Redirect

临时重定向，和302的含义相同。不同的就是307不会把`post`请求变成`get`请求，而302会把`post`请求变成`get`请求再重新向新的`url`发一次请求。

+ 400 Bad Request 

请求报文中存在语法错误，需要修改请求的内容后再次发送请求。

![image-20210924141359814](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241413872.png)

+ 401 Unauthorized(未经授权的)

需要认证的时候会返回401，第一次返回一个窗口用来填认证信息。第二次返回401，表示认证信息错误。

![image-20210924141558351](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241415442.png)

+ 403 Forbidden 禁止访问

![image-20210924141732185](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241417243.png)

+ 500 Internal Server Error

服务器在执行请求的时候发生了错误

+ 503 Service Unavailable（无法使用）

服务器无法使用

### 网关、代理、隧道

+ 代理就是充当"中间人"的角色,作用有 ①利用缓存技术，缓存资源在代理服务器上②对网站做访问控制③获取访问日志

![image-20210924143126370](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241431465.png)

+ 网关和代理类似，也是"中间人"的角色，但是网关还可以进行协议的转换

![image-20210924143114001](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241431063.png)

+ 隧道的目的是为了保证客户端和服务端进行安全的通行。与服务器之间建立一条通信线路，加`ssl`等加密手段进行通行。隧道不会解析`http`请求，隧道会在通信双方断开连接时结束。它是透明的，客户端不用在意隧道是否存在。

![image-20210924143454048](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241434105.png)

### 常用的首部字段说明

**全部字段表**

1. 通用首部字段

![image-20210924152325070](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241523112.png)

2. 请求首部字段

![image-20210924152336694](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241524827.png)



3. 响应首部字段

![image-20210924152432141](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241524179.png)

4. 实体首部字段

![image-20210924152459708](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241524746.png)

**Cache-Control** 

HTTP/1.1之前的字段是`Pragma`,为了兼容可以这样写

```javascript
Cache-Control: no-cache
Pragma: no-cache
```

> 缓存请求指令

![image-20210924145651720](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241456764.png)

> 缓存响应指令

![image-20210924145724967](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241457014.png)

+ `no-cache`指令的目的是为了防止从缓存中返回过期的资源。客户端不接受缓存过的响应，必须向服务器转发该请求。`no-cache`代表不缓存过期的资源，而`no-store`才是代表不缓存。

![image-20210924145931526](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241459585.png)

+ `max-age`，没有超过这个时间，缓存服务器直接返回资源就可以，不需要通知源服务器，为0的时候代表缓存服务器需要将请求转发给源服务器。

![image-20210924150717700](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241507772.png)

+ `no-transform`可以防止缓存服务器或者代理服务器压缩图片等操作。

**Connection**

1. 控制不再转发给代理的首部字段

`Connection:不再转发的首部字段名`

![image-20210924151610550](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241516619.png)

2. 管理持久化连接

`Connection:close`

![image-20210924151652996](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241516041.png)

`HTTP/1.1`的默认连接都是持久连接`Connection:keep-alive`

**If-xxx** 

这种请求首部字段被称为条件请求。服务器接收到附带的条件之后，只有判断指定条件为真，才会执行请求。

+ `If-Match`和服务器的`ETag`一致，服务器会接受请求。设置为*的时候，只要资源存在就进行处理。

![image-20210924154757101](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241547218.png)

+ `If-Modified-Since`指定的日期时间后，资源发生了更新，服务器会接受请求

![image-20210924154924519](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241549636.png)

+ `If-None-Match` 字段值与服务器的`ETag`不一致的时候，可处理该请求。与`If-Match`相反。通常在`get`方法中用来获取最新的资源，随便指定一个服务器没有的数据，就可以了。

![image-20210924155359416](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109241553487.png)
