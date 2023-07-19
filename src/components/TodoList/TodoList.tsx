import React from "react";

type PropsType = {
  header?: string
  header2?: string
  tasks: Array<Task>
}

type Task = {
  id: number
  title: string
  isDone: boolean
}

export const TodoList = (props: PropsType) => {
  let lis = []
  props.tasks.map(task => {
    lis.push("<li><input type=\"checkbox\" checked={task.isDone}/> <span>{task.title}</span></li>")
  })

  return (
    <div>
      <h3>{props.header}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(task => {
          return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
              <span>{task.title}</span>
            </li>
          )
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}