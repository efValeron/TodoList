import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  id: string
}
export type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  todoListId: string
  title: string
}
type RenameTodoListActionType = {
  type: "RENAME-TODOLIST"
  id: string
  title: string
}
type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  id: string
  filter: FilterValuesType
}
type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | RenameTodoListActionType
  | ChangeTodoListFilterActionType

export const todoListReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.id)
    case "ADD-TODOLIST":
      return ([{id: action.todoListId, title: action.title, filter: "all"}, ...state])
    case "RENAME-TODOLIST":
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case "CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

    default:
      return state
  }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
  return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD-TODOLIST', todoListId: v1(), title} as const
}
export const renameTodoListAC = (id: string, title: string): RenameTodoListActionType => {
  return {type: 'RENAME-TODOLIST', id, title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
