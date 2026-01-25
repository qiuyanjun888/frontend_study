/**
 * TypeScript 泛型 (Generics)
 * 
 * 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，
 * 而是在使用的时候再指定类型的一种特性。
 */

// 1. 泛型函数 (Generic Functions)
function identity<T>(arg: T): T {
    return arg;
}

const num = identity<number>(100);
const str = identity<string>("Hello TypeScript");

// 2. 多个类型参数
function mapPair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
}

const pair = mapPair("id", 123); // 自动推断类型

// 3. 泛型接口 (Generic Interfaces)
interface Box<T> {
    content: T;
}

const stringBox: Box<string> = { content: "Books" };
const numberBox: Box<number> = { content: 42 };

// 4. 泛型类 (Generic Classes)
class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Apple");
textStorage.addItem("Banana");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);

// 5. 泛型约束 (Generic Constraints)
// 要求泛型 T 必须包含 length 属性
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity("hello"); // string 有 length 属性
loggingIdentity([1, 2, 3]); // array 有 length 属性
// loggingIdentity(10); // 错误：number 没有 length 属性

// 6. 在泛型约束中使用类型参数
// 确保 K 是 T 的一个键
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // OK
// getProperty(x, "m"); // 错误：'m' 不是 x 的键

// 7. 默认泛型类型
interface Container<T = string> {
    value: T;
}

const c1: Container = { value: "default is string" };
const c2: Container<number> = { value: 123 };
