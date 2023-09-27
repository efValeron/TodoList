import React, {memo, useCallback, useMemo} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, List} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store";
import {addTaskAC} from "../state/task-reducer";
import {changeTodoListFilterAC, removeTodoListAC, renameTodoListAC} from "../state/todoList-reducer";
import {CustomButton} from "./CustomButton";
import {Task} from "./Task";

type PropsType = {
  todoListId: string
  title: string
  filter: FilterValuesType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [todoListId: string]: TaskType[]
}


export const TodoList = memo(({todoListId, title, filter}: PropsType) => {
  const dispatch = useDispatch()
  const tasks = useSelector<RootState, TaskType[]>(state => state.tasks[todoListId])

  const addTask = useCallback((title: string) => dispatch(addTaskAC(todoListId, title)), [dispatch, todoListId])
  const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType) => {
    switch (filter) {
      case "active":
        return tasks.filter(task => !task.isDone)
      case "completed":
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }

  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter])

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <h3 style={{display: "flex", justifyContent: "space-between"}}>
        <EditableSpan title={title}
                      changeTitle={useCallback((title: string) => dispatch(renameTodoListAC(todoListId, title)), [dispatch, todoListId])}/>
        <IconButton aria-label="delete" onClick={() => dispatch(removeTodoListAC(todoListId))}>
          <DeleteIcon/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} maxInputLength={15}/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <CustomButton variant={filter === "all" ? "contained" : "outlined"}
                      onClick={useCallback(() => dispatch(changeTodoListFilterAC(todoListId, "all")), [dispatch, todoListId])}
        >All</CustomButton>
        <CustomButton variant={filter === "active" ? "contained" : "outlined"}
                      onClick={useCallback(() => dispatch(changeTodoListFilterAC(todoListId, "active")), [dispatch, todoListId])}
        >Active</CustomButton>
        <CustomButton variant={filter === "completed" ? "contained" : "outlined"}
                      onClick={useCallback(() => dispatch(changeTodoListFilterAC(todoListId, "completed")), [dispatch, todoListId])}
        >Completed</CustomButton>
      </div>
      <List>
        {
          filteredTasks.map(task => <Task key={task.id} task={task} todoListId={todoListId}/>)
        }
      </List>
    </div>
  )
})