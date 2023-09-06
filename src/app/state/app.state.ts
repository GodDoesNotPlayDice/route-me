import { ActionReducerMap } from '@ngrx/store'
import { StepState } from 'src/app/state/stepper/step.state'
import {
  stepReducer,
} from 'src/app/state/stepper/step.reducer'

export interface AppState {
  readonly stepRegister : StepState
}

export const ROOT_REDUCERS : ActionReducerMap<AppState> = {
  stepRegister: stepReducer
}
