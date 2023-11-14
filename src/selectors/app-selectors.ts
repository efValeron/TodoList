import { AppRootStateType } from "app/store"

export const appSelectors = {
  selectStatus: (state: AppRootStateType) => state.app.status,
  selectError: (state: AppRootStateType) => state.app.error,
  selectIsInitialized: (state: AppRootStateType) => state.app.isInitialized,
}
