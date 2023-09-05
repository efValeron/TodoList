import React from "react";
import {FilterValuesType, Task} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
      <ListItem key={task.id} className={task.isDone ? "is-done" : ""} style={{display: "flex", justifyContent: "space-between"}}>
        <Checkbox
          checked={task.isDone}
          onChange={(e) => changeIsDoneHandler(task.id, e.currentTarget.checked)}
          icon={<CheckBoxOutlineBlankIcon/>}
          checkedIcon={<CheckBoxIcon/>}/>
        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.id)}>
          <DeleteIcon/>
        </IconButton>
      </ListItem>
    )
  }) : null

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <h3 style={{display: "flex", justifyContent: "space-between"}}>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} maxInputLength={15}/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button variant={props.activeFilter === "all" ? "contained" : "outlined"}
                onClick={() => changeFilterToStateHandler("all")}>All</Button>
        <Button variant={props.activeFilter === "active" ? "contained" : "outlined"}
                onClick={() => changeFilterToStateHandler("active")}>Active</Button>
        <Button variant={props.activeFilter === "completed" ? "contained" : "outlined"}
                onClick={() => changeFilterToStateHandler("completed")}>Completed</Button>
      </div>
      <List>
        {tasksList}
      </List>
      <ul className="todolist-ul">

      </ul>
    </div>
  )
}