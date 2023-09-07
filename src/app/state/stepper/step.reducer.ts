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
  currentStep: 0,
  maxStep    : 0,
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
    return {
      ...state,
      currentStep: state.currentStep + 1
    }
  } ),
  on( setPageStep, ( state, {page} ) => {
    return {
      ...state,
      currentPage: page
    }
  } )
)
