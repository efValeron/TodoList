import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoList-reducer";

type AddTaskActionType = {
  type: "ADD-TASK"
  todoListId: string
  title: string
}
type RenameTaskActionType = {
  type: "RENAME-TASK"
  todoListId: string
  id: string
  title: string
}
type ChangeTaskIsDoneActionType = {
  type: "CHANGE-TASK-IS-DONE"
  todoListId: string
  id: string
  isDone: boolean
}
type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  todoListId: string
  id: string
}
type ActionType = AddTaskActionType
  | RenameTaskActionType
  | ChangeTaskIsDoneActionType
  | RemoveTaskActionType
  | AddTodoListActionType
  | RemoveTodoListActionType

const initialState: TasksType = {}

export const taskReducer = (state = initialState, action: ActionType): TasksType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.todoListId]: [
          {id: v1(), title: action.title, isDone: false},
          ...state[action.todoListId]
        ]
      }
    case "RENAME-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task => task.id === action.id ? {
          ...task,
          title: action.title
        } : task)
      }
    case "CHANGE-TASK-IS-DONE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task => task.id === action.id ? {
          ...task,
          isDone: action.isDone
        } : task)
      }
    case "REMOVE-TASK":
      return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.id)}
    case "ADD-TODOLIST":
      return {[action.todoListId]: [], ...state}
    case "REMOVE-TODOLIST":
      const {[action.id]: [], ...stateRest} = state
      return stateRest

    default:
      return state
  }
}

export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => {
  return {type: "ADD-TASK", todoListId, title} as const
}
export const renameTaskAC = (todoListId: string, id: string, title: string): RenameTaskActionType => {
  return {type: "RENAME-TASK", todoListId, id, title} as const
}
export const changeTaskIsDoneAC = (todoListId: string, id: string, isDone: boolean): ChangeTaskIsDoneActionType => {
  return {type: "CHANGE-TASK-IS-DONE", todoListId, id, isDone} as const
}
export const removeTaskAC = (todoListId: string, id: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", todoListId, id} as const
}