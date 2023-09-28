import { z } from 'zod'

export interface StepStateProps {
  currentPage: number,
  currentStep: number,
  maxStep: number,
}

export const StepStateSchema = z.object( {
  currentPage: z.number(),
  currentStep: z.number(),
  maxStep: z.number(),
} )

export type StepState = z.infer<typeof StepStateSchema>

export interface StepStateProps {
  currentPage: number,
  currentStep: number,
  maxStep: number,
}

export const newStepState = (props : StepStateProps): StepState => {
  return StepStateSchema.parse( {
    currentPage: props.currentPage,
    currentStep: props.currentStep,
    maxStep: props.maxStep
  })
}
