import axios from "axios"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true
})

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  postTodolist(title: string) {
    return instance.post<Response<{item: Todolist}>>("todo-lists", {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<Response>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<Response>(`todo-lists/${todolistId}`, {title})
  }
}

type Todolist = {
  addedDate: Date
  id: string
  order: number
  title: string
}

type Response<D = {}> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}