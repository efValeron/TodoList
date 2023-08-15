import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [todoListId: string]: Task[]
}

function App() {
  // States
  const todoListId_1 = v1()
  const todoListId_2 = v1()
  const [todoLists, setTodoLists] = useState<TodolistType[]>([
    {id: todoListId_1, title: "What to learn", filter: "all"},
    {id: todoListId_2, title: "What to buy", filter: "all"},
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      {id: v1(), title: "HTML&CSS", isDone: false},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Angular", isDone: true}
    ],
    [todoListId_2]: [
      {id: v1(), title: "Water", isDone: false},
      {id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Meat", isDone: false},
      {id: v1(), title: "Beer", isDone: true},
      {id: v1(), title: "Fish", isDone: true},
      {id: v1(), title: "Pivo", isDone: false},
    ]
  })

  // Functions
  const removeTask = (todoListId: string, id: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter(task => task.id !== id)
    })
  }
  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId))
    const updatedTasks = {...tasks}
    delete updatedTasks[todoListId]
    setTasks(updatedTasks)
  }
  const addTask = (todoListId: string, title: string) => {
    if (title) setTasks({                     // if title is not empty && add new task
      ...tasks,                                     // copy previous todolists
      [todoListId]: [                               // update todolist tasks
        {id: v1(), title: title, isDone: false},    // new task
        ...tasks[todoListId]                        // copy previous tasks
      ]
    })
  }
  const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
    setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, filter} : todoList))
  }
  const changeIsDone = (todoListId: string, id: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone} : task)
    })
  }
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

  const todoListsList: JSX.Element[] = todoLists.map(todoList => {
    const filteredTasks = getFilteredTasks(tasks[todoList.id], todoList.filter)

    return (
      <TodoList
        key={todoList.id}
        todoListId={todoList.id}
        title={todoList.title}
        tasks={filteredTasks}
        activeFilter={todoList.filter}

        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeTodoListFilter}
        addTask={addTask}
        changeIsDone={changeIsDone}
      />
    )
  })

  return (
    <div className="App">
      {todoListsList}
    </div>
  );
}

export default App;

