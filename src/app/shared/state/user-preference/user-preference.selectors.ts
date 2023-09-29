import { AppState } from 'src/app/shared/state/app.state'

export const selectUserPreferences = ( state: AppState ) => state.userPreferences.value
