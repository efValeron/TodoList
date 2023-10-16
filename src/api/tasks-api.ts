import axios from "axios"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true
})

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`${todolistId}/tasks`)
  },
  postTask(todolistId: string, title: string) {
    return instance.post<Response<{ item: Task }>>(`${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<Response>(`${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, fields: Partial<Task>) {
    return instance.put<Response<{ item: Task }>>(`${todolistId}/tasks/${taskId}`, fields)
  }
}

type GetTasksResponse = {
  items: Task[]
  totalCount: number
  error: any
}

type Task = {
  id: string
  title: string
  description: any
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: any
  deadline: any
  addedDate: string
}

type Response<D = {}> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}