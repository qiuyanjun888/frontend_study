/**
 * TypeScript 箭头函数 (Arrow Functions)
 * 
 * 对于 Java 开发者来说，箭头函数不仅仅是 Lambda 表达式的语法糖，
 * 它最重要的特性是“词法作用域下的 this 绑定” (Lexical this)。
 */

// 1. 基本语法
const add = (a: number, b: number): number => {
    return a + b;
};

// 简写：如果只有一个表达式，可以省略 {} 和 return
const multiply = (a: number, b: number) => a * b;

// 2. 与普通函数 (Function Expression) 的区别：this 绑定
// 这是 Java 开发者最容易踩坑的地方

class Timer {
    seconds = 0;

    // 普通方法
    startRegular() {
        setInterval(function () {
            // 在普通函数中，this 指向调用者（在这里是 setInterval 的内部执行环境，通常是 undefined 或 window）
            // 在严格模式下，这里的 this 是 undefined
            // console.log(this.seconds); // 可能会报错：Cannot read property 'seconds' of undefined
        }, 1000);
    }

    // 使用箭头函数
    startArrow() {
        setInterval(() => {
            // 箭头函数没有自己的 this，它会捕获定义时所在上下文的 this
            // 这里的 this 永远指向 Timer 的实例，就像 Java 的实例方法一样
            this.seconds++;
            console.log(`Timer: ${this.seconds}`);
        }, 1000);
    }

    // 推荐写法：将方法定义为箭头函数属性
    // 这样无论方法如何被调用，this 永远锁定为实例
    printSeconds = () => {
        console.log(`Current seconds: ${this.seconds}`);
    }
}

// 3. 常见用途：回调函数
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n);
console.log("Squares:", squares);

// 4. 注意点
// - 箭头函数不能作为构造函数（不能使用 new）
// - 箭头函数没有 arguments 对象（Java 开发者习惯用剩余参数 ...args 替代）
const logAll = (...args: any[]) => {
    console.log(args);
};

// 演示 this 绑定的实际效果
const myTimer = new Timer();
// myTimer.startArrow(); // 可以取消注释在本地运行查看持续输出

// 5. 模拟 Java 中的闭包行为
function outer() {
    const message = "Hello from outer";
    return () => {
        console.log(message); // 箭头函数轻松捕获外部变量
    };
}

const inner = outer();
inner();
