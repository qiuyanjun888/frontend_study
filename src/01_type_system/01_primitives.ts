/**
 * 01_primitives.ts
 * 
 * 基础类型 (Primitive Types)
 * 
 * Java 开发者视角：
 * - number 涵盖了 int, long, float, double (JS 只有双精度浮点数)。
 * - boolean 对应 Java 的 boolean。
 * - string 对应 Java 的 String。
 * - symbol 是 ES6 引入的唯一标识符类型。
 */

// 1. 显式类型标注 (Explicit Types)
let userName: string = "Alice";
let age: number = 30; // 整数
let pi: number = 3.14; // 浮点数
let isActive: boolean = true;

// 2. 数组 (Arrays)
// 对应 Java 的 String[] 或 List<String>
let list: number[] = [1, 2, 3];
let genericList: Array<string> = ["A", "B"]; // 语法上更像 Java 的 List<String>

// 3. 元组 (Tuples) - Java 没有的原生概念，固定长度和类型的数组
let pair: [string, number] = ["id", 123];

// 4. TS 特有/重要的类型
// any: 绕过类型检查 (尽量少用，类似于 Java 的 Object，但更危险)
let dynamicValue: any = 42;
dynamicValue = "Hello";

// unknown: 类型的安全版本 any (必须先检查类型才能使用)
let secureValue: unknown = "I am a string";
// console.log(secureValue.toUpperCase()); // 错误，这里不能直接使用
if (typeof secureValue === "string") {
    console.log(secureValue.toUpperCase()); // 安全
}

// void: 对应 Java 的 void (用于函数没有返回值)
function logMessage(msg: string): void {
    console.log(msg);
}

// never: 表示永远不会发生的值（例如：总是抛出异常的函数）
function throwError(msg: string): never {
    throw new Error(msg);
}

console.log({ userName, age, isActive, list, pair });
