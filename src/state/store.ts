import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todoList-reducer";
import {taskReducer} from "./task-reducer";

export const store = createStore(combineReducers({
  todoLists: todoListReducer,
  tasks: taskReducer
}))

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store