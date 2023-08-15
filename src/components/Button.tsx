import React from "react";

type PropsType = {
  title: string
  callBack: () => void
  active?: boolean
}

export const Button = (props: PropsType) => {
  const onclickHandler = () => {
    props.callBack()
  }

  return (
    <button onClick={onclickHandler} className={props.active ? "active-filter" : ""}>
      {props.title}
    </button>
  )
}