import {
  addTodoListAC,
  changeTodoListFilterAC,
  removeTodoListAC,
  renameTodoListAC,
  todoListReducer
} from './todoList-reducer'
import {TodolistType} from "../App";

const startState: TodolistType[] = [
  {id: "1", title: "What to learn", filter: "all"},
  {id: "2", title: "What to buy", filter: "all"},
]

test('should remove todo', () => {
  const endState = todoListReducer(startState, removeTodoListAC("2"))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("1")
})

test('should add todo', () => {
  const endState = todoListReducer(startState, addTodoListAC("3", "new todo"))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("new todo")
  expect(endState[0].id).toBe("3")
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
