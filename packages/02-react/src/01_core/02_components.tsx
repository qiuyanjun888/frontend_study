/**
 * 02. 组件基础
 */

import React from 'react'

// ============================================
// 1. 基础函数组件
// ============================================

export function BasicComponent() {
    return (
        <section>
            <h3>1. 传统函数组件</h3>
            <p>通过 function 关键字定义，支持声明提升。</p>
        </section>
    )
}

export const ArrowComponent: React.FC = () => {
    return (
        <section>
            <h3>2. 箭头函数组件</h3>
            <p>更简洁，且方便配合 TypeScript React.FC 类型。</p>
        </section>
    )
}

// ============================================
// 2. Props 传递与解构
// ============================================

interface UserCardProps {
    name: string
    role: string
    isVip?: boolean
}

// 直接在参数中解构 Props，并设置默认值
export const UserCard = ({ name, role, isVip = false }: UserCardProps) => {
    return (
        <div style={{ margin: '10px 0', borderBottom: '1px dashed #ccc' }}>
            <strong>姓名: {name}</strong> {isVip && <mark>[VIP]</mark>}
            <p>职位: {role}</p>
        </div>
    )
}

// ============================================
// 3. Children 模式 (插槽/容器组件)
// ============================================

interface CardWrapperProps {
    title: string
    children: React.ReactNode // ReactNode 可以接收任何可渲染的内容
}

/**
 * 核心概念：{children} 代表了组件标签包裹的内部内容
 * 这在布局组件和公共容器中非常用到
 */
const CardWrapper: React.FC<CardWrapperProps> = ({ title, children }) => {
    return (
        <fieldset style={{ margin: '15px 0', padding: '10px' }}>
            <legend>{title}</legend>
            <div className="card-body">
                {children}
            </div>
        </fieldset>
    )
}

// ============================================
// 4. 组件组合 (Composition)
// ============================================

const Header = () => (
    <header>
        <h2>React 核心概念：组件化</h2>
        <hr />
    </header>
)

const Content = () => (
    <main>
        <p>现代 React 开发就像搭积木，通过组合多个小组件来构建页面。</p>

        {/* 组合演示：CardWrapper 作为一个外壳，包裹 UserCard */}
        <CardWrapper title="员工信息展示">
            <UserCard name="张三" role="前端开发" isVip={true} />
            <UserCard name="李四" role="后端开发" />
        </CardWrapper>

        <CardWrapper title="动态产品库存">
            <ProductList />
        </CardWrapper>
    </main>
)

// ============================================
// 5. 列表渲染逻辑拆分
// ============================================

const ProductList = () => {
    const products = [
        { id: 1, name: 'MacBook Pro', inStock: true },
        { id: 2, name: 'iPad Air', inStock: false },
        { id: 3, name: 'iPhone 15', inStock: true },
    ]

    return (
        <ul>
            {products.map(item => (
                <li key={item.id}>
                    {item.name} - {item.inStock ? "【有货】" : "【缺货】"}
                </li>
            ))}
        </ul>
    )
}

// ============================================
// 主页面导出
// ============================================

export default function ComponentsExamples() {
    return (
        <div style={{ padding: '20px' }}>
            <Header />
            <BasicComponent />
            <ArrowComponent />
            <hr />
            <Content />
        </div>
    )
}
