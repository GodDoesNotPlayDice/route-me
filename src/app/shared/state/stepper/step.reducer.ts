import {
	createReducer,
	on
} from '@ngrx/store'
import {
	clearStep,
	notifyStep
} from 'src/app/shared/state/stepper/step.actions'
import { StepState } from 'src/app/shared/state/stepper/step.state'

const initialState: StepState = {
	maxStep    : 3,
	currentStep: 1
}

export const stepReducer = createReducer(
	initialState,
	on( notifyStep, ( state ) => {
		const next = state.currentStep + 1 > state.maxStep
			? state.currentStep
			: state.currentStep + 1
		return {
			...state,
			currentStep: next
		}
	} ),
	on( clearStep, ( state ) => {
		return {
			...initialState
		}
	} )
)
