import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
  const header = "What to learn"

  let initTasks = [
    {id: v1(), title: "HTML&CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Angular", isDone: true}
  ]

  const [tasks, setTasks] = useState(initTasks)
  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: string) => {
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

