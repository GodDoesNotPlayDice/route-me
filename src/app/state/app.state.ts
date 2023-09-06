import { ActionReducerMap } from '@ngrx/store'
import { Register } from 'src/app/shared/models/Register'
import {
  registerReducer,
} from 'src/app/state/register-process/register.reducer'

export interface AppState {
  readonly register : Register
}

export const ROOT_REDUCERS : ActionReducerMap<AppState> = {
  register: registerReducer
}
