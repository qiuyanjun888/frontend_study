import { useState, useMemo } from 'react'

/**
 * 04. useMemo 基础与实战
 * 
 * useMemo 用于缓存“计算结果”。
 * 只有当依赖项发生变化时，才会重新计算。这对于处理昂贵的计算逻辑或保持引用的稳定性非常有用。
 */

// ============================================
// 1. 昂贵的计算 (Expensive Computation)
// ============================================
const ExpensiveCalculation = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // 模拟一个非常耗时的计算
    const slowResult = useMemo(() => {
        console.log('正在执行耗时计算...')
        let result = 0
        for (let i = 0; i < 100000000; i++) {
            result += i
        }
        return result + count
    }, [count]) // 只有 count 变化时才重新计算

    // 对比：如果不使用 useMemo，每次修改 text (即使与计算无关) 也会触发耗时计算，导致输入框卡顿
    /*
    const slowResult = (() => {
        console.log('正在执行耗时计算 (无缓存)...')
        let result = 0
        for (let i = 0; i < 100000000; i++) {
            result += i
        }
        return result + count
    })()
    */

    return (
        <div style={containerStyle}>
            <h3>1. 缓存耗时计算结果</h3>
            <p>计数器: {count} <button onClick={() => setCount(c => c + 1)}>+1</button></p>
            <p>耗时计算结果: <strong style={{ color: 'var(--primary)' }}>{slowResult}</strong></p>

            <div style={{ marginTop: '15px' }}>
                <p>随便输入点什么 (观察输入是否流畅):</p>
                <input
                    style={inputStyle}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="因为有 useMemo，这里不会卡顿"
                />
            </div>
        </div>
    )
}

// ============================================
// 2. 列表过滤 (常用场景)
// ============================================
const ListFilter = () => {
    const [query, setQuery] = useState('')
    const items = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Next.js', 'Vite']

    // 只有 query 变化时，才重新生成过滤后的列表
    const filteredItems = useMemo(() => {
        console.log('正在过滤列表...')
        return items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    }, [query])

    return (
        <div style={containerStyle}>
            <h3>2. 列表过滤优化</h3>
            <input
                style={inputStyle}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="搜索框架..."
            />
            <ul style={listStyle}>
                {filteredItems.map(item => (
                    <li key={item} style={listItemStyle}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

// ============================================
// 3. 引用稳定性 (配合子组件优化)
// ============================================
const ReferenceStability = () => {
    const [count, setCount] = useState(0)

    // 💡 重点：在 React 中 {} !== {}。
    // 如果不加 useMemo，每次渲染都会创建一个新的 user 对象（内存地址变了）。
    // 这会导致即使使用了 React.memo 的子组件也会被迫重新渲染。
    const user = useMemo(() => ({
        name: 'Bruce',
        role: 'Developer'
    }), []) // 永远返回同一个对象引用

    return (
        <div style={containerStyle}>
            <h3>3. 保持对象引用稳定</h3>
            <p>用户信息: {user.name} ({user.role})</p>
            <button onClick={() => setCount(c => c + 1)}>触发父组件渲染 ({count})</button>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                通过 useMemo 固定的对象，作为 Props 传给子组件时能有效防止子组件不必要的渲染。
            </p>
        </div>
    )
}

// 样式常量 (复用前几章风格)
const containerStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'var(--bg-sidebar)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)'
}

const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '300px'
}

const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    marginTop: '15px'
}

const listItemStyle: React.CSSProperties = {
    padding: '10px 0',
    borderBottom: '1px solid var(--border-color)',
    fontSize: '0.9rem'
}

export default function UseMemoExamples() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>useMemo 详解</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    用于缓存耗时计算的值或保持对象的引用稳定性。
                </p>
            </header>

            <ExpensiveCalculation />
            <ListFilter />
            <ReferenceStability />
        </div>
    )
}
