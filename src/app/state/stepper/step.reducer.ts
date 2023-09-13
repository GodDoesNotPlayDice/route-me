import {
  createReducer,
  on
} from '@ngrx/store'
import { StepState } from 'src/app/state/stepper/step.state'
import {
  addStep,
  notifyStep,
  setPageStep
} from 'src/app/state/stepper/step.actions'

const initialState: StepState = {
  maxStep    : 0,
  currentStep: 1,
  currentPage: 1
}

export const stepReducer = createReducer(
  initialState,
  on( addStep, ( state ) => {
    return {
      ...state,
      maxStep: state.maxStep + 1
    }
  } ),
  on( notifyStep, ( state ) => {
    const next = state.currentPage + 1 > state.maxStep ? state.currentPage : state.currentPage + 1
    return {
      ...state,
      currentStep: next,
      currentPage: next
    }
  } ),
  on( setPageStep, ( state, { page } ) => {
    return {
      ...state,
      currentPage: page
    }
  } )
)
