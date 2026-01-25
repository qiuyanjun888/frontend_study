/**
 * 04_interfaces_types.ts
 * 
 * 接口 (Interfaces) 与 类型别名 (Type Aliases)
 * 
 * Java 开发者视角：
 * - Java 的 Interface 只能由 Class 实现 (Implements)。
 * - TS 的 Interface 不仅可以被类实现，更多用于直接描述“对象的形状” (Data Shape)。
 * - 它是“结构化类型” (Structural Typing) 的核心：只要形状匹配，就认为类型一致。
 */

// 1. 基础接口 (Basic Interface)
interface User {
    id: number;
    name: string;
    // 可选属性 (Optional Property): 对应 Java 中可能为 null 的字段，在 TS 中用 ? 表示
    email?: string;
}

const alice: User = { id: 1, name: "Alice" }; // email 可选
const bob: User = { id: 2, name: "Bob", email: "bob@example.com" };

// 2. 只读属性 (Readonly)
// 类似于 Java 的 final 字段
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // ❌ 报错：无法分配到 "x" ，因为它是只读属性。

// 3. 接口继承 (Inheritance)
interface Employee extends User {
    department: string;
}

const manager: Employee = {
    id: 101,
    name: "Charlie",
    department: "Engineering"
};

// 4. 类型别名 (Type Alias)
// 使用 type 关键字给一个类型起新名字
type ID = string | number; // 可以是联合类型
type PointAlias = { x: number; y: number }; // 也可以描述对象

let myId: ID = "UID-888";

/**
 * Interface vs Type Alias:
 * - 绝大多数情况下可以互换。
 * - Interface: 擅长描述对象形状，支持“声明合并”（同名接口会自动合并字段），更符合 Java 的习惯。
 * - Type: 能够定义基本类型别名、联合类型、元组等，更灵活。
 * 最佳实践：描述公共 API 的对象结构用 Interface，定义复杂组合类型用 Type。
 */

// 5. 结构化类型 (面向对象 Java 开发者的“文化冲击”)
interface Pet {
    name: string;
}

const dog = {
    name: "Buddy",
    breed: "Golden Retriever" // 多了一个字段
};

// 只要 dog 包含了 Pet 所需的所有属性 (name)，它就可以被当作 Pet
function greetPet(pet: Pet) {
    console.log("Hello, " + pet.name);
}

greetPet(dog); // ✅ 正常运行！这在 Java 中是不可能的（除非显式 implements）。

console.log({ alice, bob, manager, myId });
