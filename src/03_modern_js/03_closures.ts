/**
 * TypeScript 闭包 (Closures) 深度解析
 * 
 * 闭包是 JavaScript/TypeScript 中最核心也最强大的特性之一。
 * 简单来说：闭包是一个函数，它“记得”自己被创建时的那个作用域（Scoping）。
 */

function outer() {
    const msg = "Hello from Closure!";

    // 这里返回的是一个函数定义（引用），而不是函数的执行结果
    return function inner() {
        // inner 函数访问了外部作用域的 msg 变量
        console.log(msg);
    };
}

// ---------------------------------------------------------
// 1. 为什么直接调用 outer() 没有输出？
// ---------------------------------------------------------
outer();
/* 
   运行 outer() 时，它只是执行了函数体：
   - 创建了 msg 变量
   - 定义了 inner 函数
   - 返回了 inner 函数的引用
   但它并没有执行 console.log。它只是把“能执行 console.log 的工具”扔出来了，你没去接。
*/

// ---------------------------------------------------------
// 2. 为什么 const hello = outer(); hello(); 有输出？
// ---------------------------------------------------------
const hello = outer(); // 第一步：调用 outer，拿到返回的 inner 函数
hello();               // 第二步：执行拿到的那个函数

/*
   这时神奇的事情发生了：即便 outer() 已经执行结束了，
   按理说它的局部变量 msg 应该销毁了。
   但因为 hello 依然持有对 inner 的引用，而 inner 依赖 msg，
   所以 msg 会一直保存在内存中——这就是“闭包”。
*/

// ---------------------------------------------------------
// 3. 为什么 outer()() 也可以？
// ---------------------------------------------------------
outer()();
/*
   这叫“双重调用”。
   第一个 ()：执行 outer，返回 inner 函数。
   第二个 ()：紧接着执行第一个 () 扔出来的那个 inner 函数。
   
   等价于：
   const tempFunc = outer();
   tempFunc();
*/

// ---------------------------------------------------------
// 4. 闭包的实际用途：私有变量 (Data Privacy)
// ---------------------------------------------------------
function createCounter() {
    let count = 0; // 这个变量在外部无法直接访问，类似 Java 的 private

    return {
        increment: () => {
            count++;
            console.log(`Current: ${count}`);
        },
        decrement: () => {
            count--;
            console.log(`Current: ${count}`);
        }
    };
}

const myCounter = createCounter();
myCounter.increment(); // 1
myCounter.increment(); // 2
// console.log(myCounter.count); // 错误！外部无法直接访问 count
