import {
  createReducer,
  on
} from '@ngrx/store'
import {
  addStep,
  notifyStep,
  setPageStep,
  StepState,
  newStepState
} from 'src/app/shared/state/stepper'

const initialState: StepState = newStepState({
  maxStep    : 0,
  currentStep: 1,
  currentPage: 1
})

export const stepReducer = createReducer(
  initialState,
  on( addStep, ( state ) => {
    return {
      ...state,
      maxStep: state.maxStep + 1
    }
  } ),
  on( notifyStep, ( state ) => {
    const next = state.currentPage + 1 > state.maxStep
      ? state.currentPage
      : state.currentPage + 1
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
