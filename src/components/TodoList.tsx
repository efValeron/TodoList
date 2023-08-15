import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {Button} from "./Button";

type PropsType = {
  header: string
  tasks: Array<Task>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeIsDone: (id: string, isDone: boolean) => void
  activeFilter: FilterValuesType
}
type Task = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList = (props: PropsType) => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const changeFilterToStateHandler = (state: FilterValuesType) => {
    props.changeFilter(state)
  }
  const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }
  const addTask = () => {
    if(!inputValue.trim()) setError("This field is required")
    props.addTask(inputValue.trim())
    setInputValue("")
  }
  const changeIsDoneHandler = (id: string, checked: boolean) => props.changeIsDone(id, checked)

  return (
    <div>
      <h3>{props.header}</h3>
      <div>
        <input
          value={inputValue}
          onChange={(e) => inputOnChangeHandler(e)}
          onKeyDown={(e) => inputKeyPressHandler(e)}
          className={error ? "error" : ""}
        />
        <Button callBack={addTask} title={"+"}/>
      </div>
      {error && <div className={"error-message"}>{error}</div>}
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
        <Button active={props.activeFilter === "all"} callBack={() => changeFilterToStateHandler("all")} title={"All"}/>
        <Button active={props.activeFilter === "active"} callBack={() => changeFilterToStateHandler("active")} title={"Active"}/>
        <Button active={props.activeFilter === "completed"} callBack={() => changeFilterToStateHandler("completed")} title={"Completed"}/>
      </div>
      <ul style={{display: "flex", flexDirection: "column", margin: "20px 0", padding: 0, gap: "5px"}}>
        {
          props.tasks.map(task => {
            const removeTaskHandler = (id: string) => props.removeTask(id)
            return (
              <li
                key={task.id}
                style={{display: "flex", justifyContent: "space-between"}}
                className={task.isDone ? "is-done" : ""}
              >
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e)=>changeIsDoneHandler(task.id, e.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <Button callBack={() => removeTaskHandler(task.id)} title={"x"}/>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}