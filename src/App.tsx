import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
  const header = "What to learn"
  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Angular", isDone: true}
  ])
  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const addTask = (title: string) => {
    if (title) setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
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
        addTask={addTask}
      />
    </div>
  );
}

export default App;

