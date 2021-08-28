---
title: C-S数据基本过程
date: 2021-08-24 19:57:39
description: Web开发浏览器的过程数据格式
cover: https://raw.githubusercontent.com/JingWZeng/markdownImg/main/img/202108231626416.jpg
top_img: https://raw.githubusercontent.com/JingWZeng/markdownImg/main/img/202108231626416.jpg
tags: 
 - 前端
 - 浏览器
author: ZJingW
categories: 
 - 前端
 - 浏览器
---

>一次http请求至少进行两次的数据转换,发送请求的时候一次,获取响应数据的时候一次

| 顺序 | 层名   | 格式                             |
| ---- | ------ | -------------------------------- |
| 1    | 应用层 | 数据                             |
| 2    | 传输层 | 数据+源端口+目标端口             |
| 3    | 网络层 | 数据+源端口+目标端口+源IP+目标IP |
| 4    | 链路层 | 转换成数字信息进行传输           |

#### 从客户端 1->2->3->4

#### 从服务端 4->3->2->1

![1441607086266971](https://raw.githubusercontent.com/JingWZeng/markdownImg/main/img/202108281639138.gif)
