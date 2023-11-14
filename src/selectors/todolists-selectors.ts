import { AppRootStateType } from "app/store"

export const todolistsSelectors = {
  getTodolists: (state: AppRootStateType) => state.todolists,
}
