import {
  createReducer,
  on
} from '@ngrx/store'
import {
  addUserRegister,
  clearUserRegister,
  updateUserRegister
} from 'src/app/state/user-register/user-register.actions'
import { UserRegisterState } from 'src/app/state/user-register/user-register.state'

const initialState: UserRegisterState = UserRegisterState.parse({
  name    : '',
  lastName: '',
  email   : '',
  password: '',
  phone   : '',
  country   : '',
  genre   : '',
  description: '',
  birthDay: new Date(),
  preferences: []
})

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
    console.log("cleared")
    return {
      ...initialState
    }
  } )
)
