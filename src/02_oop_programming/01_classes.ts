/**
 * 01_classes.ts
 * 
 * 类 (Classes)
 * 
 * Java 开发者视角：
 * - TS 的类语法与 Java 非常相似，支持构造函数、继承、访问修饰符。
 * - 关键点：TS 支持“构造函数参数属性” (Parameter Properties)，可以大幅减少样板代码。
 */

class Department {
    // 1. 显式属性声明 (像 Java 一样)
    public name: string;
    private employees: string[] = [];
    protected location: string;

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printInfo() {
        console.log(`Department: ${this.name}, Location: ${this.location}, Staff: ${this.employees.length}`);
    }
}

// 2. 构造函数参数属性 (TS 特有且极好用的语法)
// 在构造参数前加访问修饰符，TS 会自动声明并初始化该成员变量
class Employee {
    constructor(
        public readonly id: number,  // 相当于：声明属性 + 构造函数赋值 + final
        public name: string,
        private salary: number
    ) { }

    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}`;
    }

    // 访问私有变量
    getSalary() {
        return this.salary;
    }
}

// 3. 继承 (Inheritance)
class ITDepartment extends Department {
    public admins: string[];

    constructor(name: string, admins: string[]) {
        // 必须调用 super()，且在使用 this 之前
        super(name, "Building A");
        this.admins = admins;
    }

    // 重写方法
    printInfo() {
        super.printInfo();
        console.log(`Admins: ${this.admins.join(", ")}`);
    }
}

// 示例运行
const itDept = new ITDepartment("Cloud Service", ["Alice", "Bob"]);
itDept.addEmployee("Charlie");
itDept.printInfo();

const manager = new Employee(1, "John Smith", 50000);
console.log(manager.getDetails());
// console.log(manager.salary); // ❌ 报错：salary 是私有的

/**
 * Java 开发者小贴士：
 * - 默认访问权限：在 TS 中，成员默认是 public 的（Java 默认是包私有）。
 * - 属性初始化：可以在声明时初始化，也可以在构造函数中初始化。
 * - 构造函数简称：Employee 类的构造函数写法在 TS 中非常流行，因为它省去了冗长的赋值代码。
 */
