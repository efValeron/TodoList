import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
  const header = "What to learn"
  const header2 = "Grocery list"

  const tasks1 = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Angular", isDone: true}
  ]
  const tasks2 = [
    {id: 1, title: "Hello world", isDone: false},
    {id: 2, title: "I am Happy", isDone: false},
    {id: 3, title: "Yo", isDone: true}
  ]

  return (
    <div className="App">
      <TodoList header={header} tasks={tasks1}/>
      <TodoList header={header2} tasks={tasks2}/>
    </div>
  );
}

export default App;

