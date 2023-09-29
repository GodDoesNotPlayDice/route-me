import {
	createReducer,
	on
} from '@ngrx/store'
import {
	UserPreferencesState,
	clearUserPreferences,
	updateUserPreferences
} from 'src/app/shared/state/user-preference'

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
