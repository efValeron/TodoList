import { AppRootStateType } from "app/store"

export const tasksSelectors = {
  getTasks: (state: AppRootStateType) => state.tasks,
}
