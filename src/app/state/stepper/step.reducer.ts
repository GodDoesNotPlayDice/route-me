import {
  createReducer,
  on
} from '@ngrx/store'
import { StepState } from 'src/app/state/stepper/step.state'
import {
  addStep,
  notifyStep,
} from 'src/app/state/stepper/step.actions'

const initialState : StepState = {
  currentStep : 0,
  maxStep : 0,
}

export const stepReducer = createReducer(
  initialState,
  on(addStep, (state) => {
    return {
      ...state,
      maxStep: state.maxStep + 1,
    }
  }),
  on(notifyStep, (state) => {
    return {
      ...state,
      currentStep: state.currentStep + 1,
    }
  })
)
