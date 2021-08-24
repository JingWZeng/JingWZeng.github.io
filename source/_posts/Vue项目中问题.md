---
title: Vue项目中问题
date: 2021-08-24 20:36:41
description: Vue项目中遇到的一些问题
cover: https://raw.githubusercontent.com/JingWZeng/markdownImg/main/img/202108242038830.jpg
top_img: https://raw.githubusercontent.com/JingWZeng/markdownImg/main/img/202108242038830.jpg
tags: 
 - 前端
 - Vue2
author: ZJingW
categories: 
 - 前端
 - Vue2
---

+ `computer`中传参数的话需要使用闭包的方式
+ `filter`中无法访问`this`，使用`filter`的前提是有个现成的变量
+ 数字千分位处理并保留两位小数`nums.toFixed(2).replace(/(\d)(?=(\d{3}+.)/g,'$1')`
+ `splice(index,1)`返回的数据是被删除的那个数据或者数组 ----- 会改变原数组
+ `try/catch` 只能捕获同步函数的异常，包括async/await
+ `Vue`项目中报错`Already include file name 'xxxx' differs from files name...`,解决办法是：去掉后面`.vue`后缀名既可
+ 页面刷新之后，会重新加载Vue实例，store里面的值会被重新赋值，这样会造成页面刷新只会`Vuex`中数据丢失的问题，解决办法是：利用`Web`存储`(cookie\localStorage\sessionStorage)`
+ 每一个页面都是一个组件，路由跳转的时候组件就会被`销毁和重新建立`，跳转会经历一个完整的生命周期
+ `babel` 又名通天塔，它的作用是`ES6`、`ES7`转成`ES5`
+ CSS中的行内元素水平居中直接在父元素中`text-align:center`，垂直居中设置行高和高度相等:`height:10px;line-height:10px`
