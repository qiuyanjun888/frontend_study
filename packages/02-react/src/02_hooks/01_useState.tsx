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

    // 💡 为什么推荐使用回调函数更新？
    // 场景模拟：如果我们需要在一次操作中连续更新多次
    const handleMultipleAdd = () => {
        // ❌ 错误做法：直接使用 count。
        // 这三次调用拿到的 count 都是当前渲染周期的旧值（比如 0），
        // 结果相当于 setCount(0+1)、setCount(0+1)、setCount(0+1)，
        // 最终 count 只会变成 1。
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)
    }

    const handleMultipleAddCorrect = () => {
        // ✅ 正确做法：使用回调函数。
        // React 会保证 prev 永远是上一次更新完后的最新值，
        // 最终 count 会正确地变成 3。
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }

    return (
        <div style={containerStyle}>
            <h3>1. 基础计数器</h3>
            <p>当前数值: <strong style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{count}</strong></p>
            <div style={buttonGroupStyle}>
                <button onClick={() => setCount(count + 1)}>普通加 1</button>
                <button onClick={() => setCount(prev => prev + 1)}>回调加 1 (推荐)</button>
                <button onClick={handleMultipleAdd}>连续加 1 (错误演示, 会加1)</button>
                <button onClick={handleMultipleAddCorrect}>连续加 1 (正确演示, 会加3)</button>
                <button onClick={() => setCount(0)}>重置</button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                注：在异步(如 setTimeout)或闭包中，回调式更新能有效避免“状态过期”问题。
            </p>
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
        city: '上海'
    })

    // ❌ 错误做法：直接修改对象属性
    const wrongUpdateCity = (newCity: string) => {
        // 虽然我们修改了属性值，但 user 对象的内存地址（引用）没有变。
        // React 使用浅比较（Object.is）来判断状态是否改变，
        // 发现引用没变，它就会认为“没有更新”，从而不触发重新渲染。
        user.city = newCity
        setUser(user) // 即使调用了 setter，页面也不会更新
        console.log('数据已改，但页面没动:', user)
    }

    // ✅ 正确做法：创建一个全新的对象
    const rightUpdateCity = (newCity: string) => {
        // 通过展开运算符 (...) 创建一个新对象。
        // 这样引用地址变了，React 就能感知到变化并刷新 UI。
        setUser(prev => ({
            ...prev,
            city: newCity
        }))
    }

    return (
        <div style={containerStyle}>
            <h3>3. 对象状态更新 (不可变保护)</h3>
            <div style={cardStyle}>
                <p>姓名: {user.name}</p>
                <p>年龄: {user.age}</p>
                <p>城市: <strong style={{ color: 'var(--primary)' }}>{user.city}</strong></p>
            </div>

            <div style={buttonGroupStyle}>
                {/* 错误演示 */}
                <div style={{ width: '100%', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--error)' }}>
                    👇 下面这个按钮点击后，页面<strong>不会</strong>刷新：
                </div>
                <button
                    onClick={() => wrongUpdateCity('北京')}
                    style={{ borderColor: 'var(--error)' }}
                >
                    设置为北京 (错误)
                </button>

                {/* 正确演示 */}
                <div style={{ width: '100%', marginTop: '12px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--success)' }}>
                    👇 下面这两个按钮能正常更新页面：
                </div>
                <button onClick={() => rightUpdateCity('杭州')}>设为杭州 (正确)</button>
                <button onClick={() => rightUpdateCity('深圳')}>设为深圳 (正确)</button>
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
