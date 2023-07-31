import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
  const header = "What to learn"

  let initTasks = [
    {id: 1, title: "HTML&CSS", isDone: false},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Angular", isDone: true}
  ]

  const [tasks, setTasks] = useState(initTasks)
  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  const filteredTasks = filter === "active"
    ? tasks.filter(task => !task.isDone)
    : filter === "completed"
      ? tasks.filter(task => task.isDone)
      : tasks

  return (
    <div className="App">
      <TodoList
        header={header}
        tasks={filteredTasks}
        removeTaskFunc={removeTask}
        changeFilterFunc={changeFilter}
      />
    </div>
  );
}

export default App;

