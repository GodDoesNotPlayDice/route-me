import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'

export const selectRegister = (state : AppState) => state.stepRegister

export const selectCurrentStep = createSelector(
  selectRegister,
  (state) => state.currentStep
)

export const selectMaxStep = createSelector(
  selectRegister,
  (state) => state.maxStep
)
