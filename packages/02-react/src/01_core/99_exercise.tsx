interface UserProps {
  id: number,
  name: string,
  email?: string,
}

const UserProfile = ({ id, name, email = 'test@example.com' }: UserProps) => {
  return (
    <div>
      <strong>user: {name}</strong>
      <p>id: {id} - email: {email}</p>
    </div>

  )
}

interface ActionButtonProps {
  label: string,
  onAction: (msg: string) => void
}

const ActionButton = ({ label, onAction }: ActionButtonProps) => {
  return (
    <button onClick={() => onAction(`label is clicked!`)}>{label}</button>
  )
}

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
          {todo.done ? 'yes' : 'no'} - {todo.text}
        </li>
      ))}
    </ul>
  )
}

interface StatusBoxProps {
  status: "loading" | "success" | "error"
  message: string
}

const StatusBox = ({ status, message }: StatusBoxProps) => {
  const marker = {
    loading: "waiting..",
    success: "op success",
    error: "op error",
  }
  return (
    <fieldset>
      <legend>status show</legend>
      <p>
        {marker[status]} - {message}
      </p>
    </fieldset>
  )
}

export default function PropsExamples() {
  // const handleNotify = (msg: string) => alert(msg)
  const todoList: Todo[] = [
    { id: 1, text: 'write code', done: true },
    { id: 2, text: 'testing', done: false },
  ]
  return (
    <div>
      <UserProfile id={1} name="acha" />
      <UserProfile id={2} name="jack" email="jack@example.com" />
      <ActionButton label="submit" onAction={(msg: string) => alert(msg)} />

      <TodoList items={todoList} />

      <StatusBox status="success" message="data upload to cloud" />
    </div>
  )
}
