import { ActionReducerMap } from '@ngrx/store'
import { stepReducer } from 'src/app/shared/state/stepper/step.reducer'
import { StepState } from 'src/app/shared/state/stepper/step.state'

export interface AppState {
	readonly stepRegister: StepState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
	stepRegister: stepReducer
}
