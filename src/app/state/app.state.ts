import { ActionReducerMap } from '@ngrx/store'
import { StepState } from 'src/app/state/stepper/step.state'
import {
  stepReducer,
} from 'src/app/state/stepper/step.reducer'
import { userRegisterReducer } from 'src/app/state/user-register/user-register.reducer'
import { UserRegisterState } from 'src/app/state/user-register/user-register.state'

export interface AppState {
  readonly stepRegister : StepState
  readonly userRegister : UserRegisterState
}

export const ROOT_REDUCERS : ActionReducerMap<AppState> = {
  stepRegister: stepReducer,
  userRegister: userRegisterReducer
}
