import React, {useState} from "react"
import {tasksApi} from "../api/tasks-api"

export default {
  title: "API/Tasks"
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("65528d61-6c7a-4add-abac-4a6521cb3723")

  const getTasks = () => {
    tasksApi.getTasks(todolistId)
      .then(data => {
        setState(data.data)
        console.log(data.data)
      })
  }

  return <div>
    <div>
      <p>65528d61-6c7a-4add-abac-4a6521cb3723</p>
      <input
        value={todolistId}
        placeholder="todolist id"
        onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={getTasks}>+</button>
    </div>
    {
      state &&
      <>
        <h4>{state.totalCount} {JSON.stringify(state.error)}</h4>
        <div style={{display: "flex", flexWrap: "wrap", columnGap: "1rem"}}>
          {
            state.items.map((el: any) =>
              <div key={el.id}>
                <h2>task id: {el.id}</h2>
                <h2>todo id: {el.todoListId}</h2>
                <h3>title: {el.title}</h3>
              </div>
            )
          }
        </div>
      </>
    }
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [todolistId, setTodolistId] = useState("65528d61-6c7a-4add-abac-4a6521cb3723")

  const addTask = () => {
    tasksApi.postTask(todolistId, title)
      .then(data => setState(data.data))
  }

  return <div>
    <p>65528d61-6c7a-4add-abac-4a6521cb3723</p>
    {JSON.stringify(state)}
    <input
      value={todolistId}
      placeholder="todolist id"
      onChange={e => setTodolistId(e.currentTarget.value)}
    />
    <input
      value={title}
      placeholder="title"
      onChange={e => setTitle(e.currentTarget.value)}
    />
    <button onClick={addTask}>+</button>
  </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("65528d61-6c7a-4add-abac-4a6521cb3723")
  const [taskId, setTaskId] = useState("")

  const deleteTask = () => {
    tasksApi.deleteTask(todolistId, taskId)
      .then(data => setState(data.data))
  }

  return <div>
    <p>65528d61-6c7a-4add-abac-4a6521cb3723</p>
    {JSON.stringify(state)}
    <input
      value={todolistId}
      placeholder="todolist id"
      onChange={e => setTodolistId(e.currentTarget.value)}
    />
    <input
      value={taskId}
      placeholder="task id"
      onChange={e => setTaskId(e.currentTarget.value)}
    />
    <button onClick={deleteTask}>-</button>
  </div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("65528d61-6c7a-4add-abac-4a6521cb3723")
  const [taskId, setTaskId] = useState("")
  const [title, setTitle] = useState("")

  const updateTodolistTitle = () => {
    tasksApi.updateTask(todolistId, taskId, {title})
      .then(data => setState(data.data))
  }

  return <div>
    <p>65528d61-6c7a-4add-abac-4a6521cb3723</p>
    {JSON.stringify(state)}
    <input
      value={todolistId}
      placeholder="todolist id"
      onChange={e => setTodolistId(e.currentTarget.value)}
    />
    <input
      value={taskId}
      placeholder="task id"
      onChange={e => setTaskId(e.currentTarget.value)}
    />
    <input
      value={title}
      placeholder="new title"
      onChange={e => setTitle(e.currentTarget.value)}
    />
    <button onClick={updateTodolistTitle}>+</button>
  </div>
}
