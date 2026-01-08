/**
 * 03_unions_intersections.ts
 * 
 * 联合类型 (Union Types)
 * 
 * Java 开发者视角：
 * 在 Java 中，如果一个变量可能有多种类型，你可能需要用 Object 或定义一个复杂的接口/抽象类。
 * TypeScript 的联合类型允许你直接定义：“这个变量要么是 A，要么是 B”。
 */

// 1. 联合类型 (Union)
// 变量可以是 string 或 number
let userId: string | number;
userId = "A101";
userId = 101;
// userId = true; // ❌ 报错

// 2. 字面量联合类型 (Literal Unions) - 类似于更强大的 Enum
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
let method: HttpMethod = "GET";
// method = "UPDATE"; // ❌ 报错，只能是上面定义的四种字符串之一

// 3. 交叉类型 (Intersection)
// 将多个类型合并为一个（类似于让一个类同时实现多个接口）
interface Named {
    name: string;
}
interface Loggable {
    log(): void;
}

type NamedAndLoggable = Named & Loggable;

const obj: NamedAndLoggable = {
    name: "MyObject",
    log: () => console.log("Logging object...")
};

console.log("UserID:", userId);
console.log("Method:", method);
obj.log();
