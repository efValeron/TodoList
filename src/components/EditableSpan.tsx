import React from 'react'
import {TextField} from "@mui/material";

type PropsType = {
  title: string
  changeTitle: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = React.useState(false)
  const [title, setTitle] = React.useState(props.title)

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && deactivateEditMode()
  }

  return (
    editMode ? <TextField
        variant="standard"
        autoFocus
        onBlur={deactivateEditMode}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={inputKeyPressHandler}
      />
      : <span onDoubleClick={activateEditMode}>{title}</span>
  )
}