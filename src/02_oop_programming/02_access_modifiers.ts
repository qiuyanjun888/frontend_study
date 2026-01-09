/**
 * 02_access_modifiers.ts
 * 
 * 访问修饰符 (Access Modifiers)
 * 
 * Java 开发者视角：
 * - public: 哪里都能访问。TS 默认就是 public。
 * - private: 只能在类内部访问。
 * - protected: 只能在类内部及其子类中访问。
 * 
 * 重要区别：
 * 1. TS 的访问修饰符只在编译阶段有效。编译成 JS 后，所有的这些限制都会消失。
 * 2. 如果需要真正的运行时私有，可以使用 ES6 的 # 语法。
 */

class BaseUser {
    public name: string;        // 默认，随便看
    private pin: number;       // 只有 BaseUser 能看
    protected id: string;      // 只有 BaseUser 和 蓝领(子类) 能看

    constructor(name: string, pin: number, id: string) {
        this.name = name;
        this.pin = pin;
        this.id = id;
    }

    public getPinDescription() {
        // 类内部可以访问私有的 pin
        return `Name: ${this.name}, PIN has ${this.pin.toString().length} digits.`;
    }
}

class AdminUser extends BaseUser {
    constructor(name: string, pin: number, id: string) {
        super(name, pin, id);
    }

    public getAdminId() {
        // ✅ 子类可以访问父类的 protected 属性
        return `Admin ID is: ${this.id}`;
    }

    /*
    public getAdminPin() {
        // ❌ 报错：属性 "pin" 为私有属性，只能在类 "BaseUser" 中访问。
        return this.pin; 
    }
    */
}

const user = new BaseUser("Alice", 1234, "A-001");
console.log(user.name); // ✅ OK
// console.log(user.pin); // ❌ 报错：私有
// console.log(user.id);  // ❌ 报错：受保护

const admin = new AdminUser("Bob", 5678, "ADM-001");
console.log(admin.getAdminId()); // ✅ OK

/**
 * 补充：硬核私有属性 (#)
 */
class HardPrivate {
    #secret: string; // 使用 # 前缀

    constructor(secret: string) {
        this.#secret = secret;
    }

    getSecret() {
        return this.#secret;
    }
}

const hp = new HardPrivate("My Secret Value");
// console.log(hp.#secret); // ❌ 编译报错 + 运行时也会报错
console.log("Secret from method:", hp.getSecret());

/**
 * 总结：
 * 绝大多数情况下，TS 开发者使用 private 就足够了，因为它在开发阶段能提供完美的提示和拦截。
 * 只有在处理极度敏感的数据或防止运行时恶意修改时，才考虑使用 #。
 */
