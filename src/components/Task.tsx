import {Checkbox, IconButton, ListItem} from "@mui/material";
import {changeTaskIsDoneAC, removeTaskAC, renameTaskAC} from "../state/task-reducer";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {EditableSpan} from "./EditableSpan";
import React, {useCallback} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";

type Props = {
  task: TaskType
  todoListId: string
}

export const Task = ({task, todoListId}: Props) => {
  const dispatch = useDispatch()

  return (
    <ListItem className={task.isDone ? "is-done" : ""}
              style={{display: "flex", justifyContent: "space-between"}}>
      <Checkbox
        checked={task.isDone}
        onChange={
          (e) =>
            dispatch(changeTaskIsDoneAC(todoListId, task.id, e.currentTarget.checked))
        }
        icon={<CheckBoxOutlineBlankIcon/>}
        checkedIcon={<CheckBoxIcon/>}/>
      <EditableSpan title={task.title}
                    changeTitle={
                      useCallback((title: string) => dispatch(renameTaskAC(todoListId, task.id, title)),
                        [dispatch, todoListId, task.id])
                    }/>
      <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(todoListId, task.id))}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  );
};