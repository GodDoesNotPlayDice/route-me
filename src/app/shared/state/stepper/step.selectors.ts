import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/shared/state/app.state'

export const selectStepRegister = ( state: AppState ) => state.stepRegister

export const selectCurrentStep = createSelector(
	selectStepRegister,
	( state ) => state.currentStep
)

export const selectMaxStep = createSelector(
	selectStepRegister,
	( state ) => state.maxStep
)
