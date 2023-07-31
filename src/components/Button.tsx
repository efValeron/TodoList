import React from "react";

type PropsType = {
  title: string
  callBack: () => void
}

export const Button = (props: PropsType) => {
  const onclickHandler = () => {
    props.callBack()
  }

  return (
    <button onClick={onclickHandler}>
      {props.title}
    </button>
  )
}