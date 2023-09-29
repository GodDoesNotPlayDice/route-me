import { ActionReducerMap } from '@ngrx/store'
import {
  stepReducer,
  StepState
} from 'src/app/shared/state/stepper'
import {
  userPreferencesReducer,
  UserPreferencesState
} from 'src/app/shared/state/user-preference'

export interface AppState {
  readonly stepRegister: StepState
  readonly userPreferences: UserPreferencesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stepRegister: stepReducer,
  userPreferences: userPreferencesReducer,
}
