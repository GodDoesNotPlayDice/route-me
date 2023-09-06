import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'

export const selectRegister = (state : AppState) => state.register

export const selectCount = createSelector(
  selectRegister,
  (state) => state.currentStep
)
