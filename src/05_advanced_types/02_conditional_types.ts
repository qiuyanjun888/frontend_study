/**
 * TypeScript 高级特性：条件类型 (Conditional Types)
 * 
 * 对于 Java 开发者：
 * - 这类似于 Java 泛型中的边界 (`<? extends T>`)，但强大得多。
 * - 它允许在类型层面进行 "if-else" 判断。
 * - 语法：T extends U ? X : Y (即：如果 T 可以赋值给 U，则类型为 X，否则为 Y)
 */

// ---------------------------------------------------------
// 1. 基础判断
// ---------------------------------------------------------
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>; // "Yes"
type B = IsString<number>; // "No"

// ---------------------------------------------------------
// 2. 结合 infer 关键字 (类型提取)
// ---------------------------------------------------------
// infer 允许你在条件判断中“声明”一个待推断的类型变量。
// 示例：获取函数的返回值类型 (类似原生的 ReturnType<T>)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const getBruceInfo = () => ({ name: "Bruce", age: 18 });
type BruceInfo = MyReturnType<typeof getBruceInfo>; // { name: string, age: number }

// ---------------------------------------------------------
// 3. 分发条件类型 (Distributive Conditional Types)
// ---------------------------------------------------------
// 当 T 是联合类型（Union）时，TS 会自动进行“拆分布局”。
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// ---------------------------------------------------------
// 4. 实战：排除特定类型 (类似原生的 Exclude<T, U>)
// ---------------------------------------------------------
type MyExclude<T, U> = T extends U ? never : T;

// 从联合类型中排除 'age'
type OnlyName = MyExclude<"name" | "age", "age">; // "name"

// ---------------------------------------------------------
// 示例运行
// ---------------------------------------------------------
const main = () => {
    console.log("--- Conditional Types 示例 ---");

    const bruceAge: number = 18;
    console.log(`Bruce's age is: ${bruceAge} (Validated: Forever 18)`);

    // 条件类型通常在编译期生效，运行时我们通过逻辑来体现
    const formatValue = <T>(val: T): T extends string ? string : number => {
        return val as any;
    };

    const s = formatValue("Hello");
    const n = formatValue(18);

    console.log("String check:", typeof s);
    console.log("Number check:", typeof n);
};

main();
