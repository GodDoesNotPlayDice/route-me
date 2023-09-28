import {
  createAction,
  props
} from '@ngrx/store'
import { UserRegisterState } from 'src/app/shared/state/user-register/user-register.state'

export const addUserRegister = createAction(
  '[USER-REGISTER] Add USER-REGISTER',
  props<UserRegisterState>()
)

export const updateUserRegister = createAction(
  '[USER-REGISTER] Update USER-REGISTER',
  props<Partial<UserRegisterState>>()
)

export const clearUserRegister = createAction(
  '[USER-REGISTER] Clear USER-REGISTER'
)
