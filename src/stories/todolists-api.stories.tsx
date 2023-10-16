import React, {useEffect, useState} from "react"
import {todolistsApi} from "../api/todolists-api"

export default {
  title: "API/Todolists"
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists()
      .then(data => setState(data))
  }, [])

  return <div style={{display: "flex", flexWrap: "wrap"}}>
    {
      state &&
      state.data.map((el: any) =>
        <div key={el.id} style={{textAlign: "center", width: "24rem"}}>
          <h2>{el.id}</h2>
          <h3>{el.title}</h3>
        </div>
      )
      // JSON.stringify(state)
    }
  </div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState("")

  const addTodolist = () => {
    todolistsApi.postTodolist(title)
      .then(data => setState(data))
  }

  return <div>
    <GetTodolists/>
    {JSON.stringify(state)}
    <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
    <button onClick={addTodolist}>+</button>
  </div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")

  const deleteTodolist = () => {
    todolistsApi.deleteTodolist(todolistId)
      .then(data => setState(data))
  }

  return <div>
    <GetTodolists/>
    {JSON.stringify(state)}
    <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
    <button onClick={deleteTodolist}>-</button>
  </div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState("")
  const [title, setTitle] = useState("")

  const updateTodolistTitle = () => {
    todolistsApi.updateTodolist(todolistId, title)
      .then(data => setState(data))
  }

  return <div>
    <GetTodolists/>
    {JSON.stringify(state)}
    <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
    <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
    <button onClick={updateTodolistTitle}>+</button>
  </div>
}
