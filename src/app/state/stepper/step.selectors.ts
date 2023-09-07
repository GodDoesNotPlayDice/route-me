import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'

export const selectStepRegister = (state : AppState) => state.stepRegister

export const selectCurrentStep = createSelector(
  selectStepRegister,
  (state) => state.currentStep
)

export const selectMaxStep = createSelector(
  selectStepRegister,
  (state) => state.maxStep
)

export const selectPageStep = createSelector(
  selectStepRegister,
  (state) => state.currentPage
)
