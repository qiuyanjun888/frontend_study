/**
 * TypeScript 解构赋值 (Destructuring Assignment)
 * 
 * 对于 Java 开发者来说，解构赋值是一种非常高效的提取对象或数组数据的方式。
 * 在 Java 中通常需要通过大量的 getter 或者索引访问，而在 TS 中可以一行搞定。
 */

// 1. 对象解构 (Object Destructuring)
// 定义接口以支持可选属性
interface User {
    id: number;
    username: string;
    email: string;
    address: {
        city: string;
        zip: string;
    };
    role?: string; // 可选属性，Java 中类似于可能为 null 的字段
}

const user: User = {
    id: 1,
    username: "Bruce",
    email: "bruce@example.com",
    address: {
        city: "Beijing",
        zip: "100000"
    }
};

// 基础用法：提取属性
const { username, email } = user;
console.log(`User: ${username}, Email: ${email}`);

// 别名 (Renaming)：如果想换个变量名
const { username: accountName } = user;
console.log(`Account: ${accountName}`);

// 默认值 (Default Values)
// 注意：在 TS 中，如果你想解构一个可能不存在的属性并赋予默认值，
// 必须在类型定义中声明该属性为可选（?），否则编译会报错。
const { role = "guest" } = user;
console.log(`Role: ${role}`);

// 嵌套解构 (Nested Destructuring)
const { address: { city } } = user;
console.log(`City: ${city}`);


// 2. 数组解构 (Array Destructuring)
const colors = ["red", "green", "blue", "yellow"];

// 按顺序提取
const [first, second] = colors;
console.log(`First: ${first}, Second: ${second}`);

// 跳过元素
const [, , third] = colors;
console.log(`Third: ${third}`);

// 剩余元素 (Rest) - 后面会详细讲
const [primary, ...rest] = colors;
console.log(`Primary: ${primary}, Others: ${rest}`);


// 3. 函数参数解构 (Function Parameter Destructuring)
// 这是在 TypeScript 中最常用的场景，尤其是处理配置对象或 API 返回结果时。

interface Todo {
    title: string;
    completed: boolean;
}

// 不使用解构：
function printTodoOld(todo: Todo) {
    console.log(`${todo.title} is ${todo.completed ? "Done" : "Pending"}`);
}

// 使用解构：直接在参数位提取所需属性
function printTodo({ title, completed }: Todo) {
    console.log(`${title} is ${completed ? "Done" : "Pending"}`);
}

printTodo({ title: "Learn TypeScript", completed: false });


// 4. 变量交换 (Variable Swapping)
// 无需临时变量 (temp variable)
let a = 1, b = 2;
[a, b] = [b, a]
console.log(`a: ${a}, b: ${b}`); // a: 2, b: 1
