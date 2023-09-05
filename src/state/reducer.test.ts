import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  RemoveTodoListAC,
  RenameTodoListAC,
  todoListReducer
} from './todoList-reducer'
import {TodolistType} from "../App";

const startState: TodolistType[] = [
  {id: "1", title: "What to learn", filter: "all"},
  {id: "2", title: "What to buy", filter: "all"},
]

test('should remove todo', () => {
  const endState = todoListReducer(startState, RemoveTodoListAC("2"))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("1")
})

test('should add todo', () => {
  const endState = todoListReducer(startState, AddTodoListAC("new todo"))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("new todo")
})

test('should rename todo', () => {
  const endState = todoListReducer(startState, RenameTodoListAC("2", "new title"))

  expect(endState.length).toBe(2)
  expect(endState[1].title).toBe("new title")
})

test('should change todo filter', () => {
  const endState = todoListReducer(startState, ChangeTodoListFilterAC("2", "active"))

  expect(endState.length).toBe(2)
  expect(endState[1].filter).toBe("active")
})
