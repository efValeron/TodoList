import {TasksStateType} from "../App";
import {v1} from "uuid";

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
type AddEmptyTodoListActionType = {
  type: "ADD-EMPTY-TODOLIST"
  todoListId: string
}
type RemoveTodoListPropertyActionType = {
  type: "REMOVE-TODOLIST-PROPERTY"
  todoListId: string
}
type ActionType = AddTaskActionType
  | RenameTaskActionType
  | ChangeTaskIsDoneActionType
  | RemoveTaskActionType
  | AddEmptyTodoListActionType
  | RemoveTodoListPropertyActionType

export const taskReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
    case "ADD-EMPTY-TODOLIST":
      return {...state, [action.todoListId]: []}
    case "REMOVE-TODOLIST-PROPERTY":
      const updatedTasks = {...state}
      delete updatedTasks[action.todoListId]
      return updatedTasks
    default:
      return state
  }
}

export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => {
  return {type: "ADD-TASK", todoListId, title}
}
export const renameTaskAC = (todoListId: string, id: string, title: string): RenameTaskActionType => {
  return {type: "RENAME-TASK", todoListId, id, title}
}
export const changeTaskIsDoneAC = (todoListId: string, id: string, isDone: boolean): ChangeTaskIsDoneActionType => {
  return {type: "CHANGE-TASK-IS-DONE", todoListId, id, isDone}
}
export const removeTaskAC = (todoListId: string, id: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", todoListId, id}
}
export const addEmptyTodoListAC = (todoListId: string): AddEmptyTodoListActionType => {
  return {type: "ADD-EMPTY-TODOLIST", todoListId}
}
export const removeTodoListPropertyAC = (todoListId: string): RemoveTodoListPropertyActionType => {
  return {type: "REMOVE-TODOLIST-PROPERTY", todoListId}
}
