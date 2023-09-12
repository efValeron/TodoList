import {TasksStateType} from "../App";
import {
  addEmptyTodoListAC,
  addTaskAC,
  changeTaskIsDoneAC,
  removeTaskAC, removeTodoListPropertyAC,
  renameTaskAC,
  taskReducer
} from "./task-reducer";

const startState: TasksStateType = {
  ["1"]: [
    {id: "1", title: "HTML&CSS", isDone: false},
    {id: "2", title: "JS", isDone: true},
    {id: "3", title: "ReactJS", isDone: false},
  ],
  ["2"]: [
    {id: "1", title: "Water", isDone: false},
    {id: "2", title: "Bread", isDone: true},
  ]
}

test('should add task', () => {
  const endState = taskReducer(startState, addTaskAC("2", "new task"))

  expect(endState["2"].length).toBe(3)
  expect(endState["2"][0].title).toBe("new task")
})

test('should rename task', () => {
  const endState = taskReducer(startState, renameTaskAC("1", "2", "new title"))

  expect(endState["1"].length).toBe(3)
  expect(endState["1"][1].title).toBe("new title")
})

test('should change task is done property', () => {
  const endState = taskReducer(startState, changeTaskIsDoneAC("2", "2", false))

  expect(endState["2"].length).toBe(2)
  expect(endState["2"][1].isDone).toBe(false)
})

test('should remove task', () => {
  const endState = taskReducer(startState, removeTaskAC("1", "3"))

  expect(endState["1"].length).toBe(2)
  expect(endState["1"][endState["1"].length - 1].id).toBe("2")
})

test('should add empty tasks as new todo', () => {
  const endState = taskReducer(startState, addEmptyTodoListAC("3"))

  expect(Object.keys(endState).length).toBe(3)
  expect(endState["3"].length).toBe(0)
})

test('should remove todo', () => {
  const endState = taskReducer(startState, removeTodoListPropertyAC("1"))

  expect(Object.keys(endState).length).toBe(1)
  expect(endState["1"]).toBeUndefined()
})
