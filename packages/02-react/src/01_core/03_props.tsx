/**
 * 03. Props 属性传递
 *
 * Props 是父组件向子组件传递数据的唯一通道。
 * 重点：单向数据流、Props 只读性、TypeScript 类型安全。
 */

// ============================================
// 1. 基础 Props 与解构
// ============================================

interface UserProps {
  name: string
  age: number
  level?: string // 可选 Props
}

// 推荐：在参数中直接解构，并为可选值设置默认值
const UserProfile = ({ name, age, level = '普通会员' }: UserProps) => {
  return (
    <div>
      <strong>用户: {name}</strong>
      <span>
        {' '}
        (年龄: {age}, 等级: {level})
      </span>
    </div>
  )
}

// ============================================
// 2. 函数 Props (子传父 / 回调模式)
// ============================================

/**
 * 重点：React 的数据流是单向的（自上而下）。
 * 但我们可以通过“传递函数”来实现“子传父”。
 * 
 * 过程：
 * 1. 父组件定义一个函数（如 handleNotify）。
 * 2. 父组件将该函数通过 Props 传递给子组件。
 * 3. 子组件在其内部（如点击事件）调用该函数，并传入参数。
 * 4. 这样父组件就能接收到子组件传递上来的信息。
 */

interface ActionButtonProps {
  label: string
  onAction: (msg: string) => void // 传递一个回调函数
}

const ActionButton = ({ label, onAction }: ActionButtonProps) => {
  // 子组件通过调用父组件传入的函数，实现反向传值
  return <button onClick={() => onAction(`${label} 已触发`)}>{label}</button>
}

// ============================================
// 3. 复杂数据类型 (对象与数组)
// ============================================

interface Todo {
  id: number
  text: string
  done: boolean
}

interface TodoListProps {
  items: Todo[]
}

const TodoList = ({ items }: TodoListProps) => {
  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>
          {todo.done ? '[√] ' : '[ ] '} {todo.text}
        </li>
      ))}
    </ul>
  )
}

// ============================================
// 4. Props 类型安全 (联合类型与必填项)
// ============================================

interface StatusBoxProps {
  status: 'loading' | 'success' | 'error'
  message: string
}

const StatusBox = ({ status, message }: StatusBoxProps) => {
  // 根据状态显示不同的文本标记，不再使用复杂的 CSS 颜色
  const markers = {
    loading: '【正在加载...】',
    success: '【操作成功】',
    error: '【发生错误】',
  }

  return (
    <fieldset>
      <legend>状态提示</legend>
      <p>
        {markers[status]} - {message}
      </p>
    </fieldset>
  )
}

// 方式 A：在函数参数中直接解构所需字段，并使用 ...rest 获取剩余属性
const ExtraInfo = ({ author, version, ...others }: any) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <p><strong>解构出的字段：</strong></p>
      <ul>
        <li>作者: {author}</li>
        <li>版本: {version}</li>
      </ul>

      <p><strong>剩余透传的 Props (others)：</strong></p>
      <pre>{JSON.stringify(others, null, 2)}</pre>
    </div>
  )
}

/**
 * 补充知识点：
 * 如果在函数体内解构，写法如下：
 * const { author, version } = props;
 */

// ============================================
// 主示例组件 (React 18+)
// ============================================

export default function PropsExamples() {
  const handleNotify = (msg: string) => alert(msg)

  const todos: Todo[] = [
    { id: 1, text: '学习 React Props', done: true },
    { id: 2, text: '掌握 TS 类型定义', done: false },
  ]

  const extraData = {
    version: 'v1.0.0',
    author: 'Bruce',
    env: 'development',
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>React Props 实战演示</h2>
      <hr />

      <h3>1. 基础 Props & 默认值</h3>
      <UserProfile name="张三" age={25} level="至尊皇冠" />
      <UserProfile name="李四" age={30} />

      <h3>2. 回调函数 Props (子传父)</h3>
      {/* 父组件 handleNotify 传给子组件，由子组件触发反向回传数据 */}
      <ActionButton label="提交数据" onAction={handleNotify} />
      <ActionButton label="取消操作" onAction={handleNotify} />

      <h3>3. 列表与数组 Props</h3>
      <TodoList items={todos} />

      <h3>4. 类型安全 (状态标记)</h3>
      <StatusBox status="success" message="数据已同步到云端" />
      <StatusBox status="error" message="网络连接超时" />

      <h3>5. Props 展开传递</h3>
      <p>适用于将大量 Props 透传给深层子组件：</p>
      <ExtraInfo {...extraData} source="Github" />
    </div>
  )
}
