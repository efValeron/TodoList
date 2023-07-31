import React, {useState} from "react";
import {FilterValuesType} from "../App";
import {Button} from "./Button";

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
  const [inputValue, setInputValue] = useState("")

  const changeFilterToStateHandler = (state: FilterValuesType) => props.changeFilterFunc(state)
  const removeTaskHandler = (id: string) => props.removeTaskFunc(id)
  const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
  const addTaskHandler = () => {
    props.addTask(inputValue)
    setInputValue("")
  }

  return (
    <div>
      <h3>{props.header}</h3>
      <div>
        <input
          value={inputValue}
          onChange={(e) => inputOnChangeHandler(e)}
          onKeyDown={(e) => inputKeyPressHandler(e)}
        />
        <Button callBack={addTaskHandler} title={"+"}/>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
        <Button callBack={() => changeFilterToStateHandler("all")} title={"All"}/>
        <Button callBack={() => changeFilterToStateHandler("active")} title={"Active"}/>
        <Button callBack={() => changeFilterToStateHandler("completed")} title={"Completed"}/>
      </div>
      <ul style={{display: "flex", flexDirection: "column", margin: "20px 0", padding: 0, gap: "5px"}}>
        {
          props.tasks.map(task => {
            return (
              <li
                key={task.id}
                style={{display: "flex", justifyContent: "space-between"}}
              >
                <input
                  type="checkbox"
                  defaultChecked={task.isDone}
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