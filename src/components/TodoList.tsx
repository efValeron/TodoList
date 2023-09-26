import React from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store";
import {addTaskAC, changeTaskIsDoneAC, removeTaskAC, renameTaskAC} from "../state/task-reducer";
import {changeTodoListFilterAC, removeTodoListAC, renameTodoListAC} from "../state/todoList-reducer";

type PropsType = {
  todoListId: string
  title: string
  filter: FilterValuesType
}
export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [todoListId: string]: Task[]
}


export const TodoList = ({todoListId, title, filter}: PropsType) => {
  const dispatch = useDispatch()
  const tasks = useSelector<RootState, Task[]>(state => state.tasks[todoListId])

  const getFilteredTasks = (tasks: Task[], filter: FilterValuesType) => {
    switch (filter) {
      case "active":
        return tasks.filter(task => !task.isDone)
      case "completed":
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks(tasks, filter)

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <h3 style={{display: "flex", justifyContent: "space-between"}}>
        <EditableSpan title={title} changeTitle={(title: string) => dispatch(renameTodoListAC(todoListId, title))}/>
        <IconButton aria-label="delete" onClick={() => dispatch(removeTodoListAC(todoListId))}>
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={(title: string) => dispatch(addTaskAC(todoListId, title))} maxInputLength={15}/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button variant={filter === "all" ? "contained" : "outlined"}
                onClick={() => dispatch(changeTodoListFilterAC(todoListId, "all"))}>All</Button>
        <Button variant={filter === "active" ? "contained" : "outlined"}
                onClick={() => dispatch(changeTodoListFilterAC(todoListId, "active"))}>Active</Button>
        <Button variant={filter === "completed" ? "contained" : "outlined"}
                onClick={() => dispatch(changeTodoListFilterAC(todoListId, "completed"))}>Completed</Button>
      </div>
      <List>
        {
          filteredTasks.map(task =>
            <ListItem key={task.id} className={task.isDone ? "is-done" : ""}
                      style={{display: "flex", justifyContent: "space-between"}}>
              <Checkbox
                checked={task.isDone}
                onChange={(e) => dispatch(changeTaskIsDoneAC(todoListId, task.id, e.currentTarget.checked))}
                icon={<CheckBoxOutlineBlankIcon/>}
                checkedIcon={<CheckBoxIcon/>}/>
              <EditableSpan title={task.title}
                            changeTitle={(title: string) => dispatch(renameTaskAC(todoListId, task.id, title))}/>
              <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(todoListId, task.id))}>
                <DeleteIcon/>
              </IconButton>
            </ListItem>
          )
        }
      </List>
    </div>
  )
}