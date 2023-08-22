import {Button} from "./Button";
import React, {useState} from "react";
import {errorMessages} from "../data";

type PropsType = {
  addItem: (title: string) => void
  maxInputLength: number
}

export const AddItemForm = (props: PropsType) => {
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
    <>
      <div>
        <input
          value={inputValue}
          onChange={inputOnChangeHandler}
          onKeyDown={inputKeyPressHandler}
          className={error ? "error" : ""}
        />
        <Button callBack={addItem} title={"+"}/>
      </div>
      {error && <div className={"error-message"}>{error}</div>}
    </>
  )
}