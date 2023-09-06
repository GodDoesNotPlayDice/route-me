import {
  createReducer,
  on
} from '@ngrx/store'
import { Register } from 'src/app/shared/models/Register'
import {
  addStep,
  notifyStep,
} from 'src/app/state/register-process/register.actions'

const initialState : Register = {
  currentStep : 0,
  maxStep : 0,
}

export const  registerReducer = createReducer(
  initialState,
  on(addStep, (state) => {
    return {
      ...state,
      currentStep: state.currentStep + 1
    }
  }),
  on(notifyStep, (state) => {
    return state
  })
)
