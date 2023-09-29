import { ActionReducerMap } from '@ngrx/store'
import {
  stepReducer,
  StepState
} from 'src/app/shared/state/stepper'

export interface AppState {
  readonly stepRegister: StepState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stepRegister: stepReducer,
}
