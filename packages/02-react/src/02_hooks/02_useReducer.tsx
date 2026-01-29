import { useReducer, useState } from 'react'

/**
 * 02. useReducer 进阶状态管理
 * 
 * useReducer 是 useState 的替代方案，适用于复杂的状态逻辑。
 * 它借鉴了 Redux 的思想：State + Action = New State。
 */

// ============================================
// 1. 基础示例：计数器 (理解模式)
// ============================================

// 定义状态类型
interface CounterState {
    count: number
}

// 定义 Action 类型
type CounterAction =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }
    | { type: 'set', payload: number }

// Reducer 函数：纯函数，只负责计算
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'reset':
            return { count: 0 }
        case 'set':
            return { count: action.payload }
        default:
            return state
    }
}

const SimpleCounter = () => {
    // [当前状态, 派遣函数] = useReducer(处理函数, 初始状态)
    const [state, dispatch] = useReducer(counterReducer, { count: 0 })

    return (
        <div style={containerStyle}>
            <h3>1. 基础示例 (计数器)</h3>
            <p>数值: <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{state.count}</strong></p>
            <div style={buttonGroupStyle}>
                <button onClick={() => dispatch({ type: 'increment' })}>+ 1</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>- 1</button>
                <button onClick={() => dispatch({ type: 'set', payload: 100 })}>设为 100</button>
                <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
            </div>
        </div>
    )
}

// ============================================
// 2. 实战示例：任务管理器 (复杂结构)
// ============================================

interface Todo {
    id: number
    text: string
    completed: boolean
}

type TodoAction =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number }
    | { type: 'DELETE_TODO'; id: number }

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.text, completed: false }]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            )
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id)
        default:
            return state
    }
}

const TodoApp = () => {
    const [todos, dispatch] = useReducer(todoReducer, [])
    const [input, setInput] = useState('')

    const handleAdd = () => {
        if (!input.trim()) return
        dispatch({ type: 'ADD_TODO', text: input })
        setInput('')
    }

    return (
        <div style={containerStyle}>
            <h3>2. 实战示例 (任务列表)</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    style={inputStyle}
                    placeholder="输入新任务..."
                />
                <button onClick={handleAdd}>添加</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo.id} style={listItemStyle}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                flex: 1
                            }}
                            onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                            style={{ padding: '2px 8px', fontSize: '12px', borderColor: 'var(--error)' }}
                        >
                            删除
                        </button>
                    </li>
                ))}
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                点击文字可切换完成状态。这里的逻辑全部封装在 reducer 中，UI 只负责 dispatch 指令。
            </p>
        </div>
    )
}

// ============================================
// 样式定义 (复用之前的风格)
// ============================================
const containerStyle: React.CSSProperties = {
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'var(--bg-sidebar)',
    borderRadius: '12px',
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
    flex: 1
}

const listItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '6px',
    marginBottom: '8px'
}

export default function UseReducerExamples() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>useReducer 详解</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    当状态逻辑变得复杂（包含多个子值，或者下一个状态依赖于前一个状态）时，useReducer 是更好的选择。
                </p>
            </header>
            <SimpleCounter />
            <TodoApp />
        </div>
    )
}
