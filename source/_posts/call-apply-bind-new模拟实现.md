---
title: call/apply/bind/new模拟实现
date: 2021-09-15 20:17:16
description: call/apply/bind/new模拟实现
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109011607372.png
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109011607372.png
tags: 
 - 前端
 - JS
author: ZJingW
categories: 
 - 前端
 - JS
---
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    //  绑定bind的时候，传进去的参数
    var args = Array.prototype.slice.call(arguments, 1);
    // console.log(args) // [ 'daisy', 'man' ]
    var fNOP = {}  // 中转 ，避免直接修改绑定函数的prototype

    var fBound = function () {
        // 这个时候的arguments是执行函数的时候传进去的参数
        // console.log(bindArgs) // [ '18' ]
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // 原：fBound.prototype = self.prototype;
    // 现
    fNOP.prototype = self.prototype
    fBound.prototype = new fNOP()
    return fBound;
}

var foo = {
    value: 1
};

function bar(name, age,sex) {
    // console.log(this.value);
    // console.log(name);
    // console.log(age);

}

var bindFoo = bar.bind2(foo, 'daisy','man');
bindFoo('18');
// 1
// daisy
// 18