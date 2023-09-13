import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'

export const selectUserRegister = (state : AppState) => state.userRegister

export const selectUserPreferencesRegister = createSelector(
  selectUserRegister,
  (state) => state.preferences
)
