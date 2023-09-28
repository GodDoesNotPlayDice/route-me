import {
  createReducer,
  on
} from '@ngrx/store'
import {
  addUserRegister,
  clearUserRegister,
  newUserRegisterState,
  updateUserRegister,
  UserRegisterState
} from 'src/app/shared/state'

const initialState: UserRegisterState = newUserRegisterState( {
  name       : '',
  lastName   : '',
  email      : '',
  password   : '',
  phone      : '',
  country    : '',
  genre      : '',
  description: '',
  birthDay   : new Date(),
  preferences: []
} )

export const userRegisterReducer = createReducer(
  initialState,
  on( addUserRegister, ( state, payload ) => {
    return {
      ...payload
    }
  } ),
  on( updateUserRegister, ( state, payload ) => {
    return {
      ...state,
      ...payload
    }
  } ),
  on( clearUserRegister, ( state ) => {
    console.log( 'cleared' )
    return {
      ...initialState
    }
  } )
)
