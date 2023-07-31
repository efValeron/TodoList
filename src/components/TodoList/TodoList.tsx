import React, {useState} from "react";
import {FilterValuesType} from "../../App";

type PropsType = {
  header: string
  tasks: Array<Task>
  removeTaskFunc: (id: string) => void
  changeFilterFunc: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

type Task = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList = (props: PropsType) => {
  const removeTask = (id: string) => props.removeTaskFunc(id)
  const [inputValue, setInputValue] = useState("")

  const addTaskHandler = () => {
    props.addTask(inputValue)
    setInputValue("")
  }

  return (
    <div>
      <h3>{props.header}</h3>
      <div>
        <input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
        <button onClick={addTaskHandler}>+</button>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
        <button onClick={() => props.changeFilterFunc("all")}>All</button>
        <button onClick={() => props.changeFilterFunc("active")}>Active</button>
        <button onClick={() => props.changeFilterFunc("completed")}>Completed</button>
      </div>
      <ul style={{display: "flex", flexDirection: "column", margin: "20px 0", padding: 0, gap: "5px"}}>
        {props.tasks.map(task => {
          return (
            <li key={task.id} style={{display: "flex", justifyContent: "space-between"}}><input type="checkbox" defaultChecked={task.isDone}/>
              <span>{task.title}</span>
              <button onClick={() => removeTask(task.id)}>x</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}