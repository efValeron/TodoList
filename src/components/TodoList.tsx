import React from "react";
import {FilterValuesType, Task} from "../App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
  todoListId: string
  title: string
  tasks: Task[]
  activeFilter: FilterValuesType

  // CRUD tasks
  addTask: (todoListId: string, title: string) => void
  renameTask: (todoListId: string, id: string, title: string) => void
  changeIsDone: (todoListId: string, id: string, isDone: boolean) => void
  removeTask: (todoListId: string, id: string) => void

  // CRUD TodoLists
  addTodoList: (title: string) => void
  renameTodoList: (todoListId: string, title: string) => void
  changeFilter: (todoListId: string, filter: FilterValuesType) => void
  removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: PropsType) => {
  // Handlers
  const addTaskHandler = (title: string) => {
    props.addTask(props.todoListId, title)
  }
  const changeFilterToStateHandler = (state: FilterValuesType) => {
    props.changeFilter(props.todoListId, state)
  }
  const changeTodoListTitle = (title: string) => {
    props.renameTodoList(props.todoListId, title)
  }
  const removeTodolistHandler = () => {
    props.removeTodoList(props.todoListId)
  }

  const tasksList = props.tasks ? props.tasks.map(task => {
    const removeTaskHandler = (id: string) => props.removeTask(props.todoListId, id)
    const changeIsDoneHandler = (id: string, checked: boolean) => {
      props.changeIsDone(props.todoListId, id, checked)
    }
    const changeTaskTitle = (title: string) => {
      props.renameTask(props.todoListId, task.id, title)
    }

    return (
      <li
        key={task.id}
        className={task.isDone ? "is-done" : ""}
      >
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={(e) => changeIsDoneHandler(task.id, e.currentTarget.checked)}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        <Button callBack={() => removeTaskHandler(task.id)} title={"x"}/>
      </li>
    )
  }) : null

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <Button title={"x"} callBack={removeTodolistHandler}/>
      </h3>
      <AddItemForm addItem={addTaskHandler} maxInputLength={15}/>
      <div className="button-filter-group">
        <Button active={props.activeFilter === "all"} callBack={() => changeFilterToStateHandler("all")} title={"All"}/>
        <Button active={props.activeFilter === "active"} callBack={() => changeFilterToStateHandler("active")}
                title={"Active"}/>
        <Button active={props.activeFilter === "completed"} callBack={() => changeFilterToStateHandler("completed")}
                title={"Completed"}/>
      </div>
      <ul className="todolist-ul">
        {tasksList}
      </ul>
    </div>
  )
}