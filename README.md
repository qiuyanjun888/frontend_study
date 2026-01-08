# 面向 Java 开发者的 TypeScript 学习路径

本学习计划旨在通过优先关注最具影响力的特性（二八原则），帮助 Java 开发者高效地转型到 TypeScript。

## 📊 当前标准 (2026)
- **TypeScript 版本:** ~5.9.x (最新稳定版)
- **ECMAScript 版本:** ES2025 (正式版) / ES2026 (草案)
  - *注：在 JavaScript 世界中，“ES6”（ES2015）是一个重大转折点。现代 TypeScript 涵盖了直到 ES2025 及之后的所有特性。*

---

## 🚀 第一阶段：“80%” 的核心特性
这些是你 80% 的时间都会用到的功能。基于你的 Java 背景，这些内容会让你感到最亲切，但其中也存在一些关键差异。

### 1. 类型系统基础
- **静态类型:** 基础类型 (`string`, `number`, `boolean`, `any`, `unknown`, `void`, `never`)。
- **类型推断:** TS 如何猜测类型（不同于 Java 那种重度依赖显式声明的风格）。
- **联合类型与交叉类型:** `string | number`（一个变量可以属于多种可能的类型）。
- **接口 (Interfaces) 与类型别名 (Type Aliases):** 定义对象的“形状”。

### 2. 面向对象编程 (Java 风格)
- **类 (Classes):** 构造函数、属性、方法。
- **访问修饰符:** `public`, `private`, `protected` 以及 `#` 私有字段。
- **抽象类与接口:** 实现契约/规范。
- **泛型 (Generics):** TS 中相当于 `List<T>` 的实现。

### 3. 现代 JavaScript (ES6+) 基础
- **箭头函数:** 词法作用域下的 `this` 绑定（与 Java 的关键区别）。
- **解构赋值 (Destructuring):** 从对象和数组中高效提取数据。
- **展开/剩余运算符 (Spread/Rest):** 使用 `...` 进行数据合并或收集。
- **Async/Await:** 处理异步并发的现代方式（基于 Promise）。

### 4. 模块与工具链
- **ES 模块:** `import`/`export` 语法。
- **tsconfig.json:** 配置编译器（强烈建议开启“严格模式”）。

---

## 🧪 第二阶段：“20%” 的高级特性
这些是用于复杂库、框架（如 Angular/NestJS）或特定边缘场景的高级功能。

### 1. 高级类型操作
- **映射类型 (Mapped Types):** 基于旧类型创建新类型（例如：`Partial<T>`, `Readonly<T>`）。
- **条件类型 (Conditional Types):** `T extends U ? X : Y`。
- **模板字面量类型:** 强化字符串操作的类型安全。
- **类型守卫 (Type Guards) 与断言:** `is` 关键字和 `as` 语法。

### 2. 元编程 (Meta-programming)
- **装饰器 (Decorators):** 类似于 Java 的 **注解 (Annotations)**（在 NestJS/Spring 风格的框架中大量使用）。
- **元数据反射 (Metadata Reflection):** 了解 TS 如何在运行时存储类型信息。

### 3. 深度探索
- **结构化类型 vs 名义类型 (Structural vs. Nominal):** 为什么 TS 允许“长得像鸭子就是鸭子”的兼容性（不同于 Java 的严格继承）。
- **命名空间 vs 模块:** 了解为什么模块 (ESM) 最终赢得了标准之争。
- **声明文件 (.d.ts):** 如何在没有类型定义的情况下使用第三方 JS 库。

---

## 📈 学习路线图

1. **第 1 周：基础** - 基本类型、接口和箭头函数。
2. **第 2 周：OOP 桥梁** - 将 Java 的类模式迁移至 TS。
3. **第 3 周：函数式 TS** - 常用数组方法 (`map`, `filter`, `reduce`) 与解构。
4. **第 4 周：高级安全** - 泛型、联合类型与类型收窄。
5. **第 5 周：生态系统** - 使用 Vite 或 NestJS 构建一个实际项目。

---

## 📂 目录结构

项目采用了按知识点分类的目录结构，方便查阅：

```text
typescript-study/
├── src/
│   ├── 01_type_system/         # 类型系统基础 (Primitives, Inference, Unions)
│   ├── 02_oop_programming/    # 面向对象编程 (Classes, Access Modifiers, Generics)
│   ├── 03_modern_js/          # 现代 JS 特性 (Arrow Functions, Destructuring, Async)
│   ├── 04_modules/            # 模块化 (Import/Export)
│   ├── 05_advanced_types/     # 高级类型 (Mapped, Conditional Types)
│   ├── 06_meta_programming/   # 元编程 (Decorators)
│   └── 07_deep_dives/         # 深度探索 (Structural Typing, Declaration Files)
├── README.md                  # 本学习说明文档
├── package.json               # 项目依赖与脚本配置
└── tsconfig.json              # TypeScript 编译选项
```

---

## 🛠️ 如何运行代码

本项目已配置 `tsx`，它可以直接运行 `.ts` 文件而无需手动编译。

### 1. 安装依赖
如果你是第一次克隆项目，请运行：
```bash
npm install
```

### 2. 运行指定的示例文件
你可以直接运行任何一个 `.ts` 示例文件：
```bash
npx tsx <文件路径>
```

例如，运行“基础类型”示例：
```bash
npx tsx src/01_type_system/01_primitives.ts
```
