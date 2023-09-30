import {
	createReducer,
	on
} from '@ngrx/store'
import {
	clearUserPreferences,
	updateUserPreferences
} from 'src/app/shared/state/user-preference/user-preference.actions'
import { UserPreferencesState } from 'src/app/shared/state/user-preference/user-preference.state'

const initialState: UserPreferencesState ={
	value: []
}

export const userPreferencesReducer = createReducer(
	initialState,
	on( updateUserPreferences, ( state, payload ) => {
		return {
			...state,
			...payload
		}
	} ),
	on( clearUserPreferences, ( state ) => {
		return{
			...initialState
		}
	} ),
)
