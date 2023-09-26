
import {addTaskAC, changeTaskIsDoneAC, removeTaskAC, renameTaskAC, taskReducer} from "./task-reducer";
import {TasksType} from "../components/TodoList";

const startState: TasksType = {
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

test('correct task should be added to correct array', () => { // not mine
  const localState: TasksType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = addTaskAC("todolistId2", "juce");

  const endState = taskReducer(localState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => { // not mine
  const localState: TasksType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = changeTaskIsDoneAC("todolistId2", "2", false);

  const endState = taskReducer(localState, action)

  expect(endState["todolistId1"][1].isDone).toBeTruthy()
  expect(endState["todolistId2"][1].isDone).toBeFalsy()
});