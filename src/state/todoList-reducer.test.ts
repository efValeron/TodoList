import {
  addTodoListAC,
  changeTodoListFilterAC,
  removeTodoListAC,
  renameTodoListAC,
  todoListReducer
} from './todoList-reducer'
import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {addEmptyTodoListAC, taskReducer} from "./task-reducer";

const startState: TodolistType[] = [
  {id: "1", title: "What to learn", filter: "all"},
  {id: "2", title: "What to buy", filter: "all"},
]
const startTasks: TasksStateType = {
  ["1"]: [
    {id: v1(), title: "HTML&CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
  ]
}

test('should remove todo', () => {
  const endState = todoListReducer(startState, removeTodoListAC("2"))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("1")
})

test('should add todo', () => {
  const endState = todoListReducer(startState, addTodoListAC("3", "new todo"))
  const endTasks = taskReducer(startTasks, addEmptyTodoListAC("3"))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("new todo")
  expect(endState[0].id).toBe("3")
  expect(endTasks["3"].length).toBe(0)
})

test('should rename todo', () => {
  const endState = todoListReducer(startState, renameTodoListAC("2", "new title"))

  expect(endState.length).toBe(2)
  expect(endState[1].title).toBe("new title")
})

test('should change todo filter', () => {
  const endState = todoListReducer(startState, changeTodoListFilterAC("2", "active"))

  expect(endState.length).toBe(2)
  expect(endState[1].filter).toBe("active")
})
