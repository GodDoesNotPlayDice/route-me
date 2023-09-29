import {
	createAction,
	props
} from '@ngrx/store'
import { UserPreferencesState } from 'src/app/shared/state/user-preference'

export const updateUserPreferences = createAction(
	'[USER-PREFERENCES] Update USER-PREFERENCES',
	props<UserPreferencesState>()
)

export const clearUserPreferences = createAction(
	'[USER-PREFERENCES] Clear USER-PREFERENCES'
)
