import { ActionReducerMap } from '@ngrx/store'
import { stepReducer } from 'src/app/shared/state/stepper/step.reducer'
import { StepState } from 'src/app/shared/state/stepper/step.state'
import { userPreferencesReducer } from 'src/app/shared/state/user-preference/user-preference.reducer'
import { UserPreferencesState } from 'src/app/shared/state/user-preference/user-preference.state'

export interface AppState {
  readonly stepRegister: StepState
  readonly userPreferences: UserPreferencesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  stepRegister: stepReducer,
  userPreferences: userPreferencesReducer,
}
