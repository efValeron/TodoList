import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {ReactNode} from "react";
import {todoListReducer} from "./todoList-reducer";
import {taskReducer} from "./task-reducer";
import {RootState} from "./store";

const rootReducer = combineReducers({
  todoLists: todoListReducer,
  tasks: taskReducer
})

const initialGlobalState = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}