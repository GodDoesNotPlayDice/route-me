import {
  createAction
} from '@ngrx/store'

export const notifyStep = createAction(
  '[STEP] Notify STEP'
)

export const clearStep = createAction(
  '[STEP] Clear STEP'
)
