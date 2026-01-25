/**
 * TypeScript 中的属性访问：Getter, Setter 与 基础访问
 * 
 * 对于 Java 开发者：
 * - Java 中强制使用 getPersonName() / setPersonName() 方法。
 * - TypeScript/JavaScript 提供了一种“伪装成属性”的方法，即 get/set 关键字。
 * - 同时也支持直接的对象解构。
 */

class Person {
    private _name: string;
    private _age: number;

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    // 1. 使用 get 关键字 (Getter)
    // 调用时像访问属性：person.name
    get name(): string {
        console.log("正在获取姓名...");
        return this._name;
    }

    // 2. 使用 set 关键字 (Setter)
    // 调用时像赋值属性：person.name = "New Name"
    set name(value: string) {
        if (value.length < 2) {
            console.error("姓名太短了！");
            return;
        }
        console.log("正在设置姓名...");
        this._name = value;
    }

    // 传统的类似 Java 的方法也可以用，但在 JS 生态中不常用
    getAge() { return this._age; }
    setAge(age: number) { this._age = age; }
}

const p = new Person("Bruce", 30);

// --- 获取属性的不同方式 ---

// A. 通过 Getter 访问 (看起来像访问属性，实际执行了方法逻辑)
console.log(p.name);

// B. 对象解构 (Destructuring)
// 即使是 Getter 定义的“属性”，也可以被解构
const { name: userName } = p;
console.log(`解构拿到的姓名: ${userName}`);

// C. 直接访问 (如果是 public 属性)
// console.log(p._name); // 错误：_name 是 private


// --- 设置属性的不同方式 ---

// A. 通过 Setter 设置
p.name = "Alice"; // 触发 set name(value)
p.name = "A";     // 触发验证逻辑，输出错误

// B. 通过传统方法设置
p.setAge(31);


// --- 关于接口 (Interfaces) ---
// 接口只能定义“形状”，不能实现 get/set 的逻辑
interface IAnimal {
    kind: string; // 这里的 kind 可以是普通属性，也可以在实现类里是 get/set
}

class Dog implements IAnimal {
    private _kind: string = "Dog";
    get kind() { return this._kind; }
    set kind(val: string) { this._kind = val; }
}

const myDog = new Dog();
myDog.kind = "Husky"; // 赋值操作
console.log(myDog.kind); // 取值操作
