import { useState } from 'react'

/**
 * 01. useState 基础与实战
 * 
 * useState 是 React 中最常用的 Hook，用于在函数组件中添加内部状态。
 * 重点：状态更新、对象/数组状态更新、异步性、初始化函数。
 */

// ============================================
// 1. 基础计数器 (基本类型状态)
// ============================================
const BasicCounter = () => {
    const [count, setCount] = useState(0)

    return (
        <div style={containerStyle}>
            <h3>1. 基础计数器</h3>
            <p>当前数值: <strong style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{count}</strong></p>
            <div style={buttonGroupStyle}>
                <button onClick={() => setCount(count + 1)}>加 1</button>
                <button onClick={() => setCount(count - 1)}>减 1</button>
                {/* 进阶：使用回调函数更新状态 (推荐) */}
                <button onClick={() => setCount(prev => prev + 5)}>加 5 (回调式)</button>
                <button onClick={() => setCount(0)}>重置</button>
            </div>
        </div>
    )
}

// ============================================
// 2. 表单输入 (字符串状态)
// ============================================
const InputField = () => {
    const [text, setText] = useState('')

    return (
        <div style={containerStyle}>
            <h3>2. 文本输入</h3>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="输入一些内容..."
                style={inputStyle}
            />
            <p>实时预览: <span style={{ color: 'var(--text-muted)' }}>{text || '等待输入...'}</span></p>
        </div>
    )
}

// ============================================
// 3. 对象状态更新 (重要！)
// ============================================
const UserProfile = () => {
    const [user, setUser] = useState({
        name: 'Bruce',
        age: 18,
        city: '北京'
    })

    const updateCity = (newCity: string) => {
        // 错误做法：直接修改 user.city（React 不会触发重渲染）
        // 正确做法：创建一个新对象，包含旧数据和新数据
        setUser(prev => ({
            ...prev,
            city: newCity
        }))
    }

    return (
        <div style={containerStyle}>
            <h3>3. 对象状态更新</h3>
            <div style={cardStyle}>
                <p>姓名: {user.name}</p>
                <p>年龄: {user.age}</p>
                <p>城市: <strong>{user.city}</strong></p>
            </div>
            <div style={buttonGroupStyle}>
                <button onClick={() => updateCity('上海')}>设为上海</button>
                <button onClick={() => updateCity('杭州')}>设为杭州</button>
            </div>
        </div>
    )
}

// ============================================
// 4. 数组状态更新 (重要！)
// ============================================
const TodoList = () => {
    const [items, setItems] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')

    const addItem = () => {
        if (!inputValue.trim()) return
        // 数组更新也要保证“不可变性”：返回一个新数组
        setItems(prev => [...prev, inputValue])
        setInputValue('')
    }

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div style={containerStyle}>
            <h3>4. 数组状态更新</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                    style={inputStyle}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <button onClick={addItem}>添加</button>
            </div>
            <ul style={listStyle}>
                {items.map((item, index) => (
                    <li key={index} style={listItemStyle}>
                        {item}
                        <button
                            onClick={() => removeItem(index)}
                            style={{ padding: '2px 8px', fontSize: '12px' }}
                        >
                            删除
                        </button>
                    </li>
                ))}
                {items.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>暂无待办事项</p>}
            </ul>
        </div>
    )
}

// ============================================
// 5. 样式常量 (仅配合示例使用)
// ============================================
const containerStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'var(--bg-sidebar)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)'
}

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px'
}

const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '300px'
}

const cardStyle: React.CSSProperties = {
    padding: '12px',
    background: 'rgba(99, 102, 241, 0.05)',
    borderRadius: '8px',
    marginBottom: '10px'
}

const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0
}

const listItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid var(--border-color)'
}

// 主组件导出
export default function UseStateExamples() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>useState 详解</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    用于在函数组件中引入局部状态，是 Hooks 的基石。
                </p>
            </header>

            <BasicCounter />
            <InputField />
            <UserProfile />
            <TodoList />
        </div>
    )
}
