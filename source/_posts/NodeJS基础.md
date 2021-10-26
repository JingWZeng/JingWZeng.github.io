---
title: NodeJS基础
date: 2021-10-25 21:02:27
description: NodeJS基础
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202110252109098.jpg
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202110252109098.jpg
tags: NodeJS
author: ZJingW
categories: NodeJS
---

#### 什么是 NodeJS

JS 是脚本语言，脚本语言都需要一个解析器才能运行。对于写在 HTML 页面里的 JS，浏览器充当了解析器的角色。而对于需要独立运行的 JS，NodeJS 就是一个解析器。

每一种解析器都是一个运行环境，不但允许 JS 定义各种数据结构，进行各种计算，还允许 JS 使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的 JS 的用途是操作 DOM，浏览器就提供了`document`之类的内置对象。而运行在 NodeJS 中的 JS 的用途是操作磁盘文件或搭建 HTTP 服务器，NodeJS 就相应提供了`fs`、`http`等内置对象。

#### 模块

NodeJS 遵循的模块化规范是`commonJS`。其原理及使用规则见 xxx。`NodeJS`主模块就是通过命令行参数传递给`NodeJS`启动程序的模块。一个模块中的`JS`代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。一个`JS`模块里面的变量因为会被缓存，所以在多处调用的地方值是会互相影响的。

#### 模块路径解析规则

按照以下规则解析路径，直到找到模块位置

1. 内置模块

   如果传递给`require`函数的是 NodeJS 内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。

2. node_modules 目录

   NodeJS 定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块时，则 NodeJS 依次尝试使用以下路径。

   ```js
    /home/user/node_modules/foo/bar
    /home/node_modules/foo/bar
    /node_modules/foo/bar
   ```

3. NODE_PATH 环境变量

   与 PATH 环境变量类似，NodeJS 允许通过 NODE_PATH 环境变量来指定额外的模块搜索路径。NODE_PATH 环境变量中包含一到多个目录路径，路径之间在 Linux 下使用`:`分隔，在 Windows 下使用`;`分隔。例如定义了以下 NODE_PATH 环境变量：

   ```js
    NODE_PATH=/home/user/lib;/home/lib
   ```

   当使用`require('foo/bar')`的方式加载模块时，则 NodeJS 依次尝试以下路径。

   ```
    /home/user/lib/foo/bar
    /home/lib/foo/bar
   ```

#### 包

我们利用`npm install [xxx]`安装的就是包，其实就是多个模块的集合。当我们引入包的使用，利用`require`进行引入。每一包都是有一个入口文件的，如果模块的文件名字是`index.js`的话，引入的时候就可以省略掉`index.js`（这个和 ES6 的模块规则是一样的）。`npm`就是一种包管理工具。其次比较常用的还有`yarn`。需要注意的是`npm install xxx --S`安装的包是用作生产依赖，`npm install xxx --D`安装的包是用作开发依赖。(记忆：--S（保存）--D(dev 开发))。
