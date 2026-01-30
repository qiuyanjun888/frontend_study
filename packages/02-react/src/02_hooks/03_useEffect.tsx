import { useState, useEffect } from 'react'

/**
 * 02. useEffect 基础与实战
 * 
 * useEffect 是处理“副作用”的标准方式。副作用包括：
 * 数据获取 (API Calls)、手动修改 DOM、设置定时器、订阅事件等。
 * 核心：执行时机、依赖项数组 (Dependency Array)、清除函数 (Cleanup Function)。
 */

// ============================================
// 1. 生命周期演示 (三种执行时机)
// ============================================
const LifecycleDemo = () => {
    const [count, setCount] = useState(0)
    const [forceUpdate, setForceUpdate] = useState(0)
    const [log, setLog] = useState<string[]>([])

    const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10))

    // ========================================================
    // ⚠️ 重点观察：请打开浏览器控制台 (F12 -> Console) 查看打印日志
    // ========================================================

    // A. 没有任何依赖项 (死循环陷阱！)
    // 执行时机：初次渲染 + 每次组件更新（无论因为哪个状态变）。
    useEffect(() => {
        console.log('🔵 [Effect A] 执行：无依赖项 (每次渲染都跑)')

        /**
         * ❌ 陷阱警告：
         * 千万不要在这里直接调用 setLog() 或任何会触发重渲染的代码！
         * 执行流程：渲染 -> 执行此 Effect -> setLog -> 触发重渲染 -> 渲染 -> 执行此 Effect... ♻️
         * 刚才你看到只有 Option A 的日志，就是因为它陷入死循环挤掉了别的日志。
         */
    })

    // B. 空依赖项数组 []
    // 执行时机：仅在组件挂载 (Mount) 时跑一次。
    useEffect(() => {
        console.log('🚀 [Effect B] 执行：空依赖项 [] (仅挂载时跑一次)')
        addLog('🚀 挂载成功 (此日志只会出现一次)')
    }, [])

    // C. 有特定依赖项 [count]
    // 执行时机：初次渲染 + 只有 count 发生变化时才跑。
    useEffect(() => {
        console.log(`🟠 [Effect C] 执行：依赖项 [count] 变了 -> ${count}`)
        if (count > 0) {
            addLog(`Count 更新了，Effect C 捕获到值: ${count}`)
        }
    }, [count])

    return (
        <div style={containerStyle}>
            <h3>1. useEffect 生命周期演示</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                请打开<strong>浏览器控制台</strong>对比观察执行顺序：
            </p>
            <div style={buttonGroupStyle}>
                <button onClick={() => setCount(c => c + 1)}>
                    修改 Count: {count} (触发无依赖项和Count依赖项)
                </button>
                <button onClick={() => setForceUpdate(f => f + 1)}>
                    普通重渲染: {forceUpdate} (触发无依赖项)
                </button>
                <button onClick={() => setLog([])}>清空 UI 日志</button>
            </div>
            <div style={logContainerStyle}>
                <div style={{ color: 'var(--primary)', marginBottom: '5px' }}>UI 状态日志:</div>
                {log.length === 0 && <div style={{ color: '#666' }}>暂无日志...</div>}
                {log.map((item, i) => <div key={i}>{item}</div>)}
            </div>
        </div>
    )
}

// ============================================
// 2. 清除函数 (Cleanup Function)
// ============================================
const CleanupDemo = () => {
    const [show, setShow] = useState(true)

    return (
        <div style={containerStyle}>
            <h3>2. 清除函数 (清理副作用)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                当组件卸载或下一次 Effect 执行前，React 会运行返回的这个函数。
                用于清除定时器、取消订阅、移除事件监听等。
            </p>
            <button onClick={() => setShow(!show)}>{show ? '移除计时器组件' : '挂载计时器组件'}</button>
            {show && <TimerComponent />}
        </div>
    )
}

const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        console.log('定时器启动')
        const timer = setInterval(() => {
            setSeconds(s => s + 1)
        }, 1000)

        // 💡 返回一个函数作为“清除函数”
        return () => {
            console.log('定时器被清除')
            clearInterval(timer)
        }
    }, []) // 注意：如果这里不加 [], 每次渲染都会先清除旧的再开新的

    return (
        <div style={{ ...cardStyle, marginTop: '15px', textAlign: 'center' }}>
            <p>已运行秒数: <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{seconds}</strong></p>
            <small>请看控制台打印的日志...</small>
        </div>
    )
}

// ============================================
// 3. 实际场景：数据获取 (API Fetching)
// ============================================
const DataFetchingDemo = () => {
    interface Post {
        id: number;
        title: string;
    }
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [retry, setRetry] = useState(0)

    useEffect(() => {
        let isCancelled = false // 防止 React 18 Strict Mode 重复挂载导致竞态问题

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                // 模拟网络延迟
                await new Promise(resolve => setTimeout(resolve, 800))
                const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
                if (!res.ok) throw new Error('网络请求失败')
                const data = await res.json()

                if (!isCancelled) {
                    setPosts(data)
                }
            } catch (err: any) {
                if (!isCancelled) {
                    setError(err.message)
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            isCancelled = true // 清除函数中标记请求已作废
        }
    }, [retry]) // retry 变化时重新请求

    return (
        <div style={containerStyle}>
            <h3>3. 实战：数据请求</h3>
            <button onClick={() => setRetry(r => r + 1)} disabled={loading}>
                {loading ? '加载中...' : '重新请求数据'}
            </button>

            {error && <div style={{ color: 'var(--error)', marginTop: '10px' }}>❌ 错误: {error}</div>}

            <ul style={listStyle}>
                {posts.map(post => (
                    <li key={post.id} style={listItemStyle}>
                        <span><strong>#{post.id}</strong> {post.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// ============================================
// 4. 实战：窗口事件监听
// ============================================
const WindowResizeDemo = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        // 绑定事件
        window.addEventListener('resize', handleResize)

        // 💡 记得在销毁时移除，否则会导致内存泄漏!
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={containerStyle}>
            <h3>4. 实战：全局事件监听</h3>
            <p>调整浏览器窗口大小，观察下方数值：</p>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '10px' }}>
                Width: {width}px
            </div>
        </div>
    )
}

// ============================================
// 样式常量 (复用前几章风格)
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
    marginBottom: '15px'
}

const logContainerStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#38bdf8',
    padding: '12px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    maxHeight: '150px',
    overflowY: 'auto'
}

const cardStyle: React.CSSProperties = {
    padding: '15px',
    background: 'rgba(99, 102, 241, 0.05)',
    borderRadius: '8px',
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

// 主组件导出
export default function UseEffectExamples() {
    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>useEffect 详解</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    用于处理副作用。它是同步 React 状态与外部系统的桥梁（如 API、DOM、定时器等）。
                </p>
            </header>

            <LifecycleDemo />
            <CleanupDemo />
            <DataFetchingDemo />
            <WindowResizeDemo />
        </div>
    )
}
