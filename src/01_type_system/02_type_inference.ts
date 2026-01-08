/**
 * 02_type_inference.ts
 * 
 * 类型推断 (Type Inference)
 * 
 * Java 开发者视角：
 * Java 从 10 开始引入了 `var` 关键字进行局部变量类型推断。
 * TypeScript 的推断更为彻底，它是该语言设计的核心。
 */

// 即使不写 :string，TS 也能根据赋值推断出类型
let message = "Hello World"; // 被推断为 string
// message = 123; // ❌ 报错：不能将 number 赋值给 string

// 在函数中，TS 也会根据返回值推断类型
function add(a: number, b: number) {
    return a + b; // 自动推断返回值为 number
}

const result = add(5, 10); // result 被推断为 number

/**
 * 最佳实践：
 * - 简单赋值时，依赖推断可以让代码更简洁。
 * - 复杂的函数返回、公共接口显式定义类型，以提高代码的可维护性（类似于 Java 的接口契约）。
 */

console.log(`Message: ${message}, Result: ${result}`);
