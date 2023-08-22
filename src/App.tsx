import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";

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
  const todoListId_3 = v1()
  const [todoLists, setTodoLists] = useState<TodolistType[]>([
    {id: todoListId_1, title: "What to learn", filter: "all"},
    {id: todoListId_2, title: "What to buy", filter: "all"},
    {id: todoListId_3, title: "What to test", filter: "all"},
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
    ],
    [todoListId_3]: [
      {id: v1(), title: "PIVO", isDone: false},
      {id: v1(), title: "PIVO", isDone: true},
      {id: v1(), title: "PIVO", isDone: false},
      {id: v1(), title: "PIVAS", isDone: false},
      {id: v1(), title: "Pivovarnya", isDone: false},
      {id: v1(), title: "Pivovarochny zavod", isDone: false},
    ]
  })

  // CRUD tasks
  const addTask = (todoListId: string, title: string) => {
    if (title) setTasks({                     // if title is not empty && add new task
      ...tasks,                                     // copy previous todolists
      [todoListId]: [                               // update todolist tasks
        {id: v1(), title: title, isDone: false},    // new task
        ...tasks[todoListId]                        // copy previous tasks
      ]
    })
  } // C
  const renameTask = (todoListId: string, id: string, title: string) => {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, title: title} : task)})
  } // U
  const changeIsDone = (todoListId: string, id: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone} : task)
    })
  } // U
  const removeTask = (todoListId: string, id: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter(task => task.id !== id)
    })
  } // D

  // CRUD TodoLists
  const addTodoList = (title: string) => {
    if (title) {
      const newId = v1()
      setTodoLists([{id: newId, title, filter: "all"}, ...todoLists])
      setTasks({...tasks, [newId]: []})
    }
  } // C
  const renameTodoList = (todoListId: string, title: string) => {
    setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, title} : todoList))
  } // U
  const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
    setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, filter} : todoList))
  } // U
  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId))
    const updatedTasks = {...tasks}
    delete updatedTasks[todoListId]
    setTasks(updatedTasks)
  } // D

  // UI
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

        addTask={addTask}
        renameTask={renameTask}
        changeIsDone={changeIsDone}
        removeTask={removeTask}

        addTodoList={addTodoList}
        renameTodoList={renameTodoList}
        changeFilter={changeTodoListFilter}
        removeTodoList={removeTodoList}
      />
    )
  })

  return (
    <div className="App">
      <div>
        <h3>
          Add new TodoList
        </h3>
        <AddItemForm addItem={addTodoList} maxInputLength={15}/>
      </div>
      {todoListsList}
    </div>
  );
}

export default App;

