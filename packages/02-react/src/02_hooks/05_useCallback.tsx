import React, { useState, useCallback } from 'react'

/**
 * 05. useCallback 基础与实战
 * 
 * useCallback 用于缓存“函数引用”。
 * 在 React 中，每次渲染都会重新创建函数。如果你将一个函数作为 Props 传递给使用 React.memo 优化的子组件，
 * 函数引用的改变会导致子组件误以为 Props 变了，从而触发多余的渲染。
 */

// ============================================
// 1. 基础演示：防止函数被重新创建
// ============================================
const BasicCallback = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // ✅ 使用 useCallback 保持函数引用地址不变
    // 只有依赖项变化时，才会生成新函数。
    const increment = useCallback(() => {
        setCount(c => c + 1)
    }, []) // 依赖项为空，函数引用在整个生命周期内保持一致

    return (
        <div style={containerStyle}>
            <h3>1. 保持函数引用一致</h3>
            <p>计数: {count}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <ChildButton onClick={increment} label="加 1 (引用稳定)" />
                <button onClick={() => setText(t => t + '!')}>
                    重渲染父组件 (当前 Text: {text.length})
                </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                请打开控制台观察：点击“重渲染父组件”时，使用了 memo 的子按钮不会重新渲染。
            </p>
        </div>
    )
}

// 💡 必须配合 React.memo 才能看到回调函数优化的效果
const ChildButton = React.memo(({ onClick, label }: { onClick: () => void; label: string }) => {
    console.log(`子组件 [${label}] 正在渲染...`)
    return (
        <button onClick={onClick} style={{ padding: '8px 16px' }}>
            {label}
        </button>
    )
})

// ============================================
// 2. 闭包陷阱与依赖项
// ============================================
const ClosureTrap = () => {
    const [count, setCount] = useState(0)

    // ❌ 错误演示：如果依赖项没写对，函数内部可能会捕获老的变量值
    const showCountWrong = useCallback(() => {
        alert(`当前数值 (错误捕获): ${count}`)
    }, []) // 依赖项为空，它永远只能拿到 count 的初始值 0

    // ✅ 正确演示
    const showCountRight = useCallback(() => {
        alert(`当前数值 (正确捕获): ${count}`)
    }, [count]) // 只有 count 变了，才更新函数引用

    return (
        <div style={containerStyle}>
            <h3>2. 闭包与依赖项 (常见错误)</h3>
            <p>当前 Count: {count}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setCount(c => c + 1)}>加 1</button>
                <button onClick={showCountWrong}>点击弹窗 (永远弹 0)</button>
                <button onClick={showCountRight} style={{ borderColor: 'var(--primary)' }}>点击弹窗 (正确值)</button>
            </div>
        </div>
    )
}

// ============================================
// 3. 性能优化总结
// ============================================
const OptimizationTips = () => {
    return (
        <div style={containerStyle}>
            <h3>3. 什么时候使用 useCallback?</h3>
            <ul style={{ ...listStyle, color: 'var(--text-muted)' }}>
                <li>✅ 当函数作为 Props 传递给被 <code>React.memo</code> 包裹的子组件时。</li>
                <li>✅ 当函数作为其他 Hook (如 <code>useEffect</code>) 的依赖项时。</li>
                <li>❌ 不要盲目在所有地方都加 useCallback！简单组件内部定义的点击处理函数不需要。</li>
            </ul>
        </div>
    )
}

// 样式常量 (复用风格)
const containerStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'var(--bg-sidebar)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)'
}

const listStyle: React.CSSProperties = {
    paddingLeft: '20px',
    lineHeight: '1.8',
    fontSize: '0.9rem'
}

export default function UseCallbackExamples() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>useCallback 详解</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    用于缓存函数引用，主要配合 React.memo 减少子组件不必要的渲染。
                </p>
            </header>

            <BasicCallback />
            <ClosureTrap />
            <OptimizationTips />
        </div>
    )
}
