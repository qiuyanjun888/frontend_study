# 前端学习计划

> **目标**：作为 Java 程序员，掌握前端技能以独立开发产品，记录自己的学习过程。

## 学习路线图

```
TypeScript → React → Next.js
     ↓
  Node.js
     ↓
  NestJS（需要复杂后端时）
```

---

## 模块一：TypeScript 基础

> Java 程序员优势：类型系统、面向对象、泛型等概念直接迁移

### 学习内容

| 主题 | 说明 |
|------|------|
| 基础类型 | string, number, boolean, array, object |
| 接口与类型别名 | interface vs type，类似 Java 接口 |
| 函数类型 | 参数类型、返回类型、箭头函数 |
| 类与继承 | 与 Java 类似，但 JS 更常用组合 |
| 泛型 | 与 Java 泛型几乎一致 |
| 模块系统 | import/export，类似 Java 的 package |
| 异步编程 | Promise, async/await（重点！） |
| 类型推断 | TS 比 Java 更智能的类型推断 |
| 联合类型与交叉类型 | Java 没有的概念，很实用 |
| 工具类型 | Partial, Pick, Omit 等，按需学习 |

### 实战输出
- [ ] 完成 10+ 个小练习
- [ ] 能够看懂 React 项目中的 TypeScript 代码

---

## 模块二：React 基础

> 核心模块！现代前端开发的基石

### 学习内容

| 主题 | 说明 |
|------|------|
| JSX 语法 | HTML + JS 的混合写法 |
| 组件思维 | 函数组件为主，类组件了解即可 |
| Props 与 State | 数据流核心概念 |
| useState Hook | 状态管理基础 |
| useEffect Hook | 副作用处理（API调用等） |
| 事件处理 | onClick, onChange 等 |
| 条件渲染与列表 | 动态 UI 渲染 |
| 表单处理 | 受控组件、表单验证 |
| useContext | 简单的全局状态 |
| useRef | DOM 引用、持久化值 |
| 自定义 Hook | 逻辑复用 |
| useMemo/useCallback | 性能优化，10万用户暂时不需要 |

### 实战输出
- [ ] Todo App（经典练手）
- [ ] 带表单的 CRUD 页面
- [ ] 调用后端 API 展示数据

---

## 模块三：Next.js 全栈开发

> **重点模块**！一个框架搞定前后端，最适合独立开发者

### 为什么选 Next.js？
- 零配置开箱即用
- 内置路由，无需 React Router
- API Routes 可直接写后端接口
- 服务端渲染(SSR) 对 SEO 友好
- Vercel 一键部署，免费额度足够 10 万用户

### 学习内容

| 主题 | 说明 |
|------|------|
| App Router | 基于文件的路由系统（v13+） |
| 页面与布局 | page.tsx, layout.tsx |
| Server Components | 服务端组件，默认行为 |
| Client Components | 'use client' 客户端交互 |
| API Routes | route.ts 写后端接口 |
| 数据获取 | fetch, Server Actions |
| 动态路由 | [id], [...slug] 等 |
| Middleware | 认证、重定向等 |
| 图片优化 | next/image 组件 |
| 环境变量 | .env 配置管理 |
| 部署 | Vercel 一键部署 |

### 实战输出
- [ ] 个人博客/作品集网站
- [ ] 带用户认证的 SaaS 应用
- [ ] 完整的全栈项目部署上线

---

## 模块四：样式方案

> 推荐使用 TailwindCSS，快速出活

### 学习内容

| 主题 | 说明 |
|------|------|
| CSS 基础 | Flexbox, Grid 布局 |
| TailwindCSS | 工具类 CSS，开发效率极高 |
| 响应式设计 | 移动端适配 |
| UI 组件库 | shadcn/ui 或 Ant Design |

### 实战输出
- [ ] 使用 TailwindCSS 完成一个响应式页面
- [ ] 集成 shadcn/ui 组件库

---

## 模块五：Node.js 基础


### 学习内容

| 主题 | 说明 |
|------|------|
| 模块系统 | CommonJS vs ESM |
| npm/pnpm 包管理 | 类似 Maven/Gradle |
| 文件操作 | fs 模块 |
| HTTP 服务 | 了解即可，用框架更好 |
| 事件循环 | 理解异步原理 |

---

## 模块六：NestJS

### 学习内容

| 主题 | 说明 |
|------|------|
| 模块/控制器/服务 | 类似 Spring MVC |
| 依赖注入 | 与 Spring 几乎一致 |
| 中间件与管道 | 请求处理链 |
| TypeORM 集成 | 类似 JPA/Hibernate |
| 认证与授权 | JWT, Guard |


---

## 项目结构

```
frontend_study/
├── packages/
│   ├── 01-typescript/    # TypeScript 基础练习
│   ├── 02-nodejs/        # Node.js 基础（可选）
│   ├── 03-react/         # React 组件练习
│   ├── 04-nextjs/        # Next.js 全栈项目
│   └── 05-nestjs/        # NestJS 后端（可选）
├── pnpm-workspace.yaml   # monorepo 配置
└── package.json          # 根配置
```

---

## 给 Java 程序员的建议

1. **拥抱函数式编程**：JS/TS 更偏向函数式，少用 class
2. **习惯异步**：async/await 无处不在，不像 Java 多线程
3. **类型可以松一点**：不需要像 Java 那样严格，TS 类型推断很强
4. **组件化思维**：React 组件 ≈ 可复用的 UI 类
5. **文档优先**：前端生态变化快，官方文档是最好的学习资料

---

## 📖 官方文档资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [React 官方文档](https://react.dev/)
- [Next.js 官方文档](https://nextjs.org/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/) - 高质量 React 组件

---

## 学习进度追踪

- [ ] 模块一：TypeScript 基础
- [ ] 模块二：React 基础
- [ ] 模块三：Next.js 全栈开发
- [ ] 模块四：样式方案
- [ ] 模块五：Node.js 基础（可选）
- [ ] 模块六：NestJS（可选）
- [ ] 实战项目：部署上线第一个产品 🚀
