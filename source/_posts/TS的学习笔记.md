---
title: TS的学习笔记
date: 2021-11-15 20:40:26
description: TS的学习笔记
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202111121629626.jpg
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202111121629626.jpg
tags: typeScript
author: ZJingW
categories: typeScript
---

## 基础

### 啥是 TS？

我是这样解释的，JS 是一门的动态的语言，也就是说它没有编译阶段，这样就会导致等到运行的时候才会发现本应该在编译期间就知道的错误，比如说语法错误。TS 就不一样了，它是一门静态的语言，所以它会有编译的阶段，先编译成 JS，这个过程就可以知道很多错误的地方，因此 TS 会比 typescript 更加强大。

> TS 依旧是 typescript 一样是弱类型的语言，也就是说它兼容所有的 typescript 特性，强弱类型的区别特征是会不会进行类型的隐形转换，JS 会，TS 兼容 typescript 的所有特征，所以也会，但是可以通过手段来限制。

### 原始数据类型

#### 布尔值

需要注意的是，通过构造函数`Boolean`创造的对象不是布尔值，而是`Boolean`对象。其他的基本类型也是一样，除了`null`和`undefined`

```typescript
let isDone: boolean = false; // ✅
let isDone: Boolean = new Boolean(1); // ✅
let isDone: boolean = new Boolean(1); // ❌
```

#### 数值

```typescript
let a: number = 4;
let b: number = 0b1010; // 不管几进制的数字都是一样的
let c: number = NaN;
let d: number = Infinity;
```

#### 字符串

```typescript
let name: string = "zengxpang";
let nickName: string = `zjingw${name}`; //模板字符串也一样
```

#### 空值

TS 特有的概念空值`void`,表示函数没有任何返回值。

```typescript
function alertAge(): void {
  alert("My name is zengxpang");
}
```

或者 void 类型的变量只有`null`或`undefined`，不建议用 🤯

```typescript
let a: void = null;
let b: void = undefined;
```

#### null 和 undefined

```typescript
let a: undefined = undefined;
let b: null = null;
```

它们与`void`的区别就是,`null`和`undefined`是所有类型的子类型，也就是说所有的类型都可以是它们。比如

```typescript
let a: number = undefined; // ✅ 严格模式下会报错
```

但是`void`不行。不过都不建议用啦。知道就好啦~~~因为貌似现在都会报错 🤯

```typescript
let a:number = void //❌
```

#### 任意值 和 类型推导

任意值`any`就是可以表示成任何值，此时和 typescript 差不多。

```typescript
let name: any = "zengxpang";
name = 8888;
```

如果变量不声明类型，默认也是`any`类型

```typescript
let something;
something = "zengxpang"; // 因为这里不是声明即赋值，所有是没有类型推导的，不会保错
something = 1;
// 等同于
let something: any;
something = "zengxpang";
something = 1;
// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
```

注意

```typescript
let something = "zengxpang";
something = 7; //❌ 因为TS的类型推导，相当于let something:string = 'zengxpang'

// 还有一种写法比较容易混
let something: string;
something = 7; //❌ 已经有定义类型啦
something = "zengxpang"; // ✅
```

### 联合类型

就是取值可以为多种选择，多种类型中的一种。

```typescript
let manyId: string | number;
manyId = "zengxpang";
manyId = 8888;
```

注意

访问联合类型里面的属性或者方法，如果不确定是变量到底是联合类型中的那一个，那么只能访问此联合类型的公告属性和方法。

```typescript
function getLength(something: string | number): number {
  return something.length;
} //❌
// 因为number是没有length属性的
function getLength(something: string | number): string {
  return something.toString();
} //✅
// number 和string都有toString方法
```

一旦确定了变量被赋值的时候的类型，那就可以用啦

```typescript
let a: string | number;
a = "zengxpang";
console.log(a.length); // 9
a = 8;
console.log(a.length); //❌
```

### 接口

接口是对行为的抽象，用类去实现。在使用接口的时候呢，使用者需要与接口的形状保持一致，类比现实中电脑接口。

```typescript
interface Person{
    name:string;
    age:number;
    sex?:string; // ?表示可选
}
let zengxpang :Person={
    name:'zengxpang',
    age:number
}，
// zengxpang的形状就跟接口Person的一致啦，这是必须的。多属性不行；少属性也是不行的，除非属性是可选的
```

接口中加任意属性

```typescript
interface Person {
  name: string;
  age: number;
  [propName: string]: any;
}
let zengxpang: Person = {
  name: "zengxpang",
  age: 23,
  speaker: "chinese",
};
// 使用[propName:string]定义了属性名是任意的字符串就行
```

注意

**一旦接口中有任意类型存在的话，那么确定属性和可选属性的类型必须是它的类型的子集。** 这个概念可能是有点超出认知的。

```typescript
interface Person {
  name: string;
  age?: number; //❌
  [propName: string]: string;
}
// 因为任意属性的类型都要求是string类型的，但是age的属性类型居然是number，所以会报错。解决办法是使用联合类型或者any(见上面)
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
} //✅
```

只读属性

```typescript
interface Person{
    readonly idCard:number;
}
let zengxpang:Person{
    idCard:9527; // 必须给该属性赋值，不然也会报错哦，和确定属性一样
}
zengxpang.idCard = 9999 //❌ 无法修改，它是只读属性来的
```

### 数组

表示方法有三种：

1. 类型+[]

```typescript
let a: number[] = [1, 2, 3, 4, 5];
```

2. 泛型

```typescript
let a: Array<number> = [1, 2, 3, 4, 5];
```

3. 接口表示

```typescript
interface a {
  [index: number]: number;
}
// 表示如果索引是数字的话，那么值必须也是number
let b: a = [1, 2, 3, 4, 5];
```

正常情况下不会用这种方式表示，太麻烦，但是它需要用在类数组中。类数组只能用接口的方式来表示。

```typescript
function sum() {
  let args: number[] = arguments; //❌ 类数组不能使用普通数组的表示方法，而应该用接口
}
```

```typescript
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
/*
需要注意的是参考啥上节接口部分:一旦接口中有任意类型存在的话，那么确定属性和可选属性的类型必须是它的类型的子集。
有一个前提，任意属性的类型为string时，那么确定属性和可选属性的类型都必须为它的类型的子集，这个例子是number类型，所以没有报错，把任意属性类型换成string就会
也就是[index:number],index是number类型，不会检测其他非number类型的key
*/

function sum() {
  let args: {
    [index: number]: string;
    length: number;
    callee: Function;
  } = arguments;
}
/*
这里也是不会报错
*/
```

`any`在数组中的作用就是表示数组中可以出现任意的类型

```typescript
let list: any[] = [1, 2, false, "zengxpang", { a: 9527 }];
```

### 函数

TS 中的函数需要考虑到输入和输出

```typescript
function sum(x: number, y: number): number {
  return x + y;
}
// 输入的参数多余的或者缺少的都不可以
```

函数表示式

```typescript
ley sum = function(x:number,y:number):number{
    return x+y
}
// 编译可以通过，但是其实左边是通过类型推导的，完整的写法是
let sum:(x:number,y:number)=>number = function(x:number,y:number):number{
    return x+y
}
//此=>与ES6的=>箭头函数不同，TS里面的箭头是用来表示函数的定义，左边是输入类型，右边是输出类型
```

接口定义函数的形状

```typescript
interface func {
  (a: string, b: string): boolean;
}
let myFunc: func;
myFunc = function (a: string, b: string) {
  return a.length === b.length;
};
```

可选参数

```typescript
function func(a: string, b?: string) {
  return b ? a + b : a;
}
let zengxpang = func("aaa", "bbb");
let lx = func("aaa");
/*
可选参数必须放在必选参数的后面
*/
function func(b?: string, a: string) {
  //❌
  return b ? a + b : a;
}
```

参数的默认值：TS 的函数的默认值会被自动当成是可选的参数

```typescript
function func(a: string, b: string = "cat") {
  return a + b;
}
let zengxpang = func("aaa", "bbb");
let lx = func("aaa");
/*
此时不用遵守该规则：可选参数必须放在必选参数的后面
*/
function func(b: string = "cat", a: string) {
  //✅
  return a + b;
}
```

剩余参数，其实就是一个数组

```typescript
function func(arrData: any[], ...items: any[]) {
  items.forEach((item) => {
    arrData.push(item);
  });
}
let a = [];
func(a, 1, 2, 3);
// rest 参数只能是最后一个参数
```

重载：让函数接受不同数量或者类型的参数，然后做不同的处理

用联合类型实现:不够精确，应该是输入为数字的时候，输出也为之对应为数字。

```typescript
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

用重载实现：

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
// 重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
// TS会优先从最前面的函数定义开始匹配,所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
```

### 类型断言

断言就是手动指定一个值的类型。

语法

```typescript
值 as 类型;
```

用途

**1.将一个联合类型断言为其中一个类型**

联合类型那节提起过，使用联合类型的时候，当 TS 不确定变量是哪个类型的话，只能访问此联合类型的公共属性和方法。有的时候，我们需要在不确定类型的时候就访问其中一个类型特有的属性或者方法的时候，就可以使用断言。

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
//❌ 因为不确定此时的类型
function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === "function") {
    return true;
  }
  return false;
}
//✅
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
```

断言是欺骗 TS 的编译器的。特别容易出错，所以还是少用好点。比如：

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom: Cat = {
  name: "Tom",
  run() {
    console.log("run");
  },
};
swim(tom);
```

编译的时候不会报错，但是执行的时候会。因为 animal 可以有两种类型，但是 Cat 类型是没有 swim 的方法的。

**2.将一个父类断言为更加具体的子类**

类之间的继承关系的时候

```typescript
class A extends Error {
  code: number = 0;
}
class B extends Error {
  statusCode: number = 0;
}
function whichError(error: Error) {
  if (typeof (error as A).code === "number") {
    return true;
  }
  return false;
}
// 这里可以利用instanceof来判断，判断是不是在原型上嘛 error instanceof A。但是更多的情况是A、B不是一个真正的类，而是一个TS的接口。接口是没办法使用instanceof方法的。所以此时就只能用as断言啦
```

**3.将任何一个类型断言为 any **

理解这个作用之前，需要清楚的是：TS 当我们引用一个在此类型上不存在的属性或者方法的时候，会报错

```typescript
const foo: number = 1;
foo.length = 1; //❌
```

设想这样的场景：确定这段代码不会出错:往 window 上加一个属性，TS 编译会报错，提示我们 `window` 上不存在 `foo` 属性。

```
window.foo = 1   //❌
(window as any).foo = 1  //✅ 因为在any类型的变量上，任何属性都是可以被访问的
```

**4.将 any 断言为一个具有的类型 **

就是亡羊补牢，防止滋生更多的 any。第三方包或者以前的旧代码。

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCaCheData("tom") as Cat; // 返回值从any断言为Cat类型。就可以明确tom的类型啦。之后就不会一直any下去
tom.run();
```

#### 断言的限制

**要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可**

#### 双重断言

**除非迫不得已，千万别用双重断言。**

#### 断言 VS 类型转换

断言只会影响 TS 编译时的类型，编译完成之后就会被删除掉。所以断言是不会影响变量的类型的。

#### 断言 VS 类型声明

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}
// 断言
const tom = getCacheData("tom") as Cat;
tom.run();
// 类型声明
const tom: Cat = getCacheData("tom");
tom.run();
```

区别是：

```typescript
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
// 断言
let tom = animal as Cat; //✅  父类可以被断言为具体的子类
// 类型声明
let tom: Cat = animal; //❌
```

`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。

它们核心区别就在于：

- `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
- `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行

但是 `Cat` 并不兼容 `Animal`。

`getCacheData('tom')` 是 `any` 类型，`any` 兼容 `Cat`，`Cat` 也兼容 `any`。故

```typescript
const tom = getCacheData("tom") as Cat;
```

等价于

```typescript
const tom: Cat = getCacheData("tom");
```

知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。

所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅。

#### 断言 VS 泛型

利用泛型实现上面的例子

```typescript
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData<Cat>("tom");
tom.run();
```

通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

### 内置对象

typescript 的内置对象，TS 已经定义好了类型

```typescript
//ECMAScript的内置对象
let b: Boolean = new Boolean(1);
let e: Error = new Error("Error occurred");
let d: Date = new Date();
let r: RegExp = /[a-z]/;
// DOM与BOM
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function (e: MouseEvent) {
  // Do something
});
```

```typescript
Math.pow(10, "2"); //❌
//内部定义是
interface Math {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number): number;
}
```

## 进阶

### 类型的别名

类型别名用来给一个类型起个新名字。利用`type`关键字，经常用在联合类型上。

```typeScript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
