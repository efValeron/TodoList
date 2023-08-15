import React, {useState} from "react";
import {FilterValuesType, Task} from "../App";
import {Button} from "./Button";

type PropsType = {
  todoListId: string
  title: string
  tasks: Task[]
  removeTask: (todoListId: string, id: string) => void
  removeTodoList: (todoListId: string) => void
  addTask: (todoListId: string, title: string) => void
  changeFilter: (todoListId: string, filter: FilterValuesType) => void
  changeIsDone: (todoListId: string, id: string, isDone: boolean) => void
  activeFilter: FilterValuesType
}

export const TodoList = (props: PropsType) => {
  // States | Refs | Variables
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Functions
  const changeFilterToStateHandler = (state: FilterValuesType) => {
    props.changeFilter(props.todoListId, state)
  }
  const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addTask()
  }
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }
  const addTask = () => {
    if (!inputValue.trim()) setError("This field is required")
    props.addTask(props.todoListId, inputValue.trim())
    setInputValue("")
  }
  const changeIsDoneHandler = (id: string, checked: boolean) => {
    props.changeIsDone(props.todoListId, id, checked)
  }
  const removeTodolistHandler = () => {
    props.removeTodoList(props.todoListId)
  }

  return (
    <div>
      <h3>
        {props.title}
        <Button title={"x"} callBack={removeTodolistHandler} />
      </h3>
      <div>
        <input
          value={inputValue}
          onChange={inputOnChangeHandler}
          onKeyDown={inputKeyPressHandler}
          className={error ? "error" : ""}
        />
        <Button callBack={addTask} title={"+"}/>
      </div>
      {error && <div className={"error-message"}>{error}</div>}
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
        <Button active={props.activeFilter === "all"} callBack={() => changeFilterToStateHandler("all")} title={"All"}/>
        <Button active={props.activeFilter === "active"} callBack={() => changeFilterToStateHandler("active")}
                title={"Active"}/>
        <Button active={props.activeFilter === "completed"} callBack={() => changeFilterToStateHandler("completed")}
                title={"Completed"}/>
      </div>
      <ul style={{display: "flex", flexDirection: "column", margin: "20px 0", padding: 0, gap: "5px"}}>
        {
          props.tasks.map(task => {
            const removeTaskHandler = (id: string) => props.removeTask(props.todoListId, id)
            return (
              <li
                key={task.id}
                style={{display: "flex", justifyContent: "space-between"}}
                className={task.isDone ? "is-done" : ""}
              >
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeIsDoneHandler(task.id, e.currentTarget.checked)}
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