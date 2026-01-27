/**
 * 01. JSX 基础语法
 *
 * JSX 是 JavaScript XML 的缩写，允许在 JS 中写类似 HTML 的代码
 */

// 1. 基础 JSX
export const BasicJSX = () => {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>这是一个基础的 JSX 示例</p>
    </div>
  )
}

// 2. 表达式嵌入
export const JSXWithExpressions = () => {
  const name = '张三'
  const age = 25
  const isStudent = true

  return (
    <div>
      <h2>表达式嵌入</h2>
      <p>姓名: {name}</p>
      <p>年龄: {age}</p>
      <p>计算: {2 + 2}</p>
      <p>状态: {isStudent ? '学生' : '非学生'}</p>
    </div>
  )
}

// 3. 条件渲染
export const ConditionalRendering = () => {
  const isLoggedIn = true
  const hasPermission = false

  return (
    <div>
      <h2>条件渲染</h2>
      {/* 三元运算符 */}
      {isLoggedIn ? <p>欢迎回来！</p> : <p>请先登录</p>}

      {/* && 短路运算 */}
      {hasPermission && <button>管理员操作</button>}

      {/* 复杂条件 */}
      {isLoggedIn && !hasPermission && <p>权限不足</p>}
    </div>
  )
}

// 4. 列表渲染
export const ListRendering = () => {
  const fruits = ['苹果', '香蕉', '橙子', '葡萄']

  const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 },
  ]

  return (
    <div>
      <h2>列表渲染</h2>

      {/* 简单列表 */}
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      {/* 对象列表 - 使用唯一 ID 作为 key */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.age}岁
          </li>
        ))}
      </ul>
    </div>
  )
}

// 5. Fragment 用法
export function FragmentExample() {
  return (
    <>
      <h2>Fragment 示例</h2>
      <p>使用 Fragment 可以避免额外的 div 包裹</p>
      <p>这样可以保持 DOM 结构更清晰</p>
    </>
  )
}

// 6. 样式和类名
export const StylingExample = () => {
  const isActive = true

  // 内联样式对象
  const headingStyle = {
    color: 'blue',
    fontSize: '24px',
    fontWeight: 'bold',
  }

  return (
    <div>
      <h2 style={headingStyle}>样式示例</h2>

      {/* 内联样式 */}
      <p style={{ color: 'red', marginTop: '10px' }}>这是红色文字</p>

      {/* 动态类名 */}
      <button className={isActive ? 'btn-active' : 'btn-inactive'}>按钮</button>
    </div>
  )
}

// 主组件 - 展示所有示例
export default function JSXExamples() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>JSX 语法学习</h1>
      <hr />
      <BasicJSX />
      <hr />
      <JSXWithExpressions />
      <hr />
      <ConditionalRendering />
      <hr />
      <ListRendering />
      <hr />
      <FragmentExample />
      <hr />
      <StylingExample />
    </div>
  )
}
