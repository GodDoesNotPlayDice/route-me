// StepperComponent
// StepperItemComponent

// al hacer un click en un item o boton, se debe continuar
// excepto si se encuentra en el ultimo paso, en ese caso se debe enviar el formulario

// cada paso, debe avisar que existe al estado
// cada paso, debe notificar al estado que se ha completado

// export const increment
import {
  createAction,
  props
} from '@ngrx/store'

export const addStep = createAction(
  '[REGISTER] Add STEP'
)

export const notifyStep = createAction(
  '[REGISTER] Notify STEP'
)
