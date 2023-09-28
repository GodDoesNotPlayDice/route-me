import { ActionReducerMap } from '@ngrx/store'
import { stepReducer } from 'src/app/shared/state/stepper/step.reducer'
import { StepState } from 'src/app/shared/state/stepper/step.state'
import { userRegisterReducer } from 'src/app/shared/state/user-register/user-register.reducer'
import { UserRegisterState } from 'src/app/shared/state/user-register/user-register.state'

export interface AppState {
  readonly stepRegister: StepState
  readonly userRegister: UserRegisterState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stepRegister: stepReducer,
  userRegister: userRegisterReducer
}
