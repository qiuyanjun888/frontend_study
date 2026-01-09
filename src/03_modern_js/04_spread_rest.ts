/**
 * TypeScript 展开 (Spread) 与 剩余 (Rest) 运算符
 * 
 * 在 JS/TS 中，`...` 三个点有两种完全相反的用法：
 * 1. 展开 (Spread)：把一个整体拆开（Unpack）
 * 2. 剩余 (Rest)：把零散的元素收集起来（Pack）
 */

// ==========================================
// 1. 展开运算符 (Spread Operator) - "拆开"
// ==========================================

// --- 数组合并 ---
const oldNumbers = [1, 2, 3];
const newNumbers = [...oldNumbers, 4, 5, 6];
console.log("Merged Arrays:", newNumbers); // [1, 2, 3, 4, 5, 6]

// --- 对象合并 & 浅拷贝 ---
const user = { name: "Bruce", age: 30 };
const updatedUser = {
    ...user,        // 复制 user 的所有属性
    location: "BJ", // 添加新属性
    age: 31         // 覆盖现有属性（类似 Java 的 Builder 模式覆盖）
};
console.log("Updated User:", updatedUser);

// --- 传递数组作为多个参数 ---
const sum = (a: number, b: number, c: number) => a + b + c;
const myArgs: [number, number, number] = [10, 20, 30];
console.log("Sum with Spread:", sum(...myArgs));


// ==========================================
// 2. 剩余运算符 (Rest Operator) - "收集"
// ==========================================

// --- 函数剩余参数 (Rest Parameters) ---
// 对应 Java 中的可变参数 (Varargs): public void log(String... args)
function logMessages(prefix: string, ...rest: string[]) {
    console.log(prefix, rest.join(", "));
}

logMessages("Error Logs:", "Network Timeout", "Invalid Input", "Stack Overflow");

// --- 解构中的剩余元素 ---
const scores = [90, 85, 80, 75, 70];
const [top, second, ...everyoneElse] = scores;
console.log(`First: ${top}, Second: ${second}, Remainder:`, everyoneElse);

const person = { id: 1, firstName: "Bruce", lastName: "Wayne", role: "Developer" };
const { id, ...details } = person; // 提取 id，剩余的属性全收进 details 对象
console.log("ID:", id);
console.log("Other Details:", details);


// ==========================================
// 3. 关键区别：展开 vs 剩余
// ==========================================

// 展开：出现在“被赋值”的右侧，或是函数调用的参数位置
const arr = [1, 2, ...[3, 4]];

// 剩余：出现在解构的等号左侧，或是函数定义参数的末尾
function test(...vals: number[]) {
    const [first, ...others] = vals;
}
