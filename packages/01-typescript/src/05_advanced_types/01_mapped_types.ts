/**
 * TypeScript 高级特性：映射类型 (Mapped Types)
 * 
 * 对于 Java 开发者：
 * - 映射类型在 Java 中没有直接对应的概念。
 * - 它允许你通过“遍历”一个已知类型的属性，来创建另一个新类型。
 * - 你可以把它想象成一种“跨类型的泛型循环”，在编译期自动生成新的 POJO/DTO。
 */

interface User {
    id: number;
    name: string;
    age: number;
}

// ---------------------------------------------------------
// 1. 基础映射类型
// ---------------------------------------------------------
// 语法：{ [P in keyof T]: T[P] }
// 这将遍历 T 的所有键 P，并保持其原本的类型 T[P]
type CloneUser = {
    [K in keyof User]: User[K];
};

// ---------------------------------------------------------
// 2. 使用映射修饰符 (Mapping Modifiers)
// ---------------------------------------------------------

// 让所有属性变为可选 (Optional) - 类似 Java 中的所有字段都允许 null
type OptionalUser = {
    [K in keyof User]?: User[K];
};

// 让所有属性变为只读 (Readonly) - 类似 Java 的 final 字段
type ReadonlyUser = {
    [K in keyof User]: Readonly<User[K]>;
};

// 移除修饰符：使用 '-' 号
interface PartialUser {
    id?: number;
    name?: string;
}

// 强制让所有属性变为必填 (-?)
type RequiredUser = {
    [K in keyof PartialUser]-?: PartialUser[K];
};

// ---------------------------------------------------------
// 3. 键名重映射 (Key Remapping via `as`)
// ---------------------------------------------------------
// 结合模板字面量类型，可以统一修改键名。类似 Java 生成 Getter 方法名。
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
/*
生成的 UserGetters 类型如下：
{
    getId: () => number;
    getName: () => string;
    getAge: () => number;
}
*/

// ---------------------------------------------------------
// 示例运行
// ---------------------------------------------------------
const main = () => {
    console.log("--- Mapped Types 示例 ---");

    // 1. 使用可选类型
    const partialUser: OptionalUser = { name: "Bruce" }; // id 和 age 此时是可选的
    console.log("Optional User:", partialUser);

    // 2. 使用只读类型 (编译期校验)
    const immutableUser: Readonly<User> = { id: 1, name: "Wayne", age: 18 };
    // immutableUser.name = "Clark"; // ❌ 错误：无法分配到 "name" ，因为它是只读属性。

    // 3. 模拟 Getter 初始化
    const userGetters: UserGetters = {
        getId: () => 1,
        getName: () => "Bruce",
        getAge: () => 18
    };
    console.log("Getter output:", userGetters.getName());
};

main();

/**
 * 总结：
 * 映射类型是 TS 强大的“元编程”工具，常用于：
 * 1. 批量修改现有类型的属性（变可选、变只读）。
 * 2. 根据现有类型派生出 DTO 或具有特定命名的接口。
 * 3. 减少代码重复，保持类型定义的一致性。
 */
