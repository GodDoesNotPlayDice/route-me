import {
  createAction,
  props
} from '@ngrx/store'

export const addStep = createAction(
  '[STEP] Add STEP'
)

export const notifyStep = createAction(
  '[STEP] Notify STEP'
)

export const setPageStep = createAction(
  '[STEP] Set Page STEP',
  props<{ page: number }>()
)
