import React, {memo, useState} from "react";
import {errorMessages} from "../data";
import {TextField} from "@mui/material";
import {CustomButton} from "./CustomButton";

type PropsType = {
  addItem: (title: string) => void
  maxInputLength: number
}

export const AddItemForm = memo((props: PropsType) => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    const trimmedInputValue = inputValue.trim()
    if (trimmedInputValue && trimmedInputValue.length <= props.maxInputLength) {
      props.addItem(trimmedInputValue)
      setInputValue("")
    } else if (!trimmedInputValue) setError(errorMessages.titleErr)
  }
  const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addItem()
  }
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    if (inputValue.trim().length > props.maxInputLength) setError(errorMessages.maxInputLengthErr + props.maxInputLength)
    else setError(null)
    setInputValue(inputValue)
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem"
    }}>
      <TextField
        error={!!error}
        value={inputValue}
        onChange={inputOnChangeHandler}
        onKeyDown={inputKeyPressHandler}
        label="Title"
        variant="outlined"
        helperText={error}
      />
      <CustomButton variant="contained" onClick={addItem}>Add</CustomButton>
    </div>

  )
})