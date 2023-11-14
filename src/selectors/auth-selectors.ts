import { AppRootStateType } from "app/store"

export const authSelectors = {
  selectIsLoggedIn: (state: AppRootStateType) => state.auth.isLoggedIn,
}
