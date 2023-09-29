import { z } from 'zod'

export const EndTripDateSchema = z.object( {
  value : z.date()
} ).transform( ( val, ctx ) => {
  const twoWeeks          = new Date( val.value.getTime() + 12096e5 )
  val.value = twoWeeks
  return val
})

export type EndTripDateType = z.infer<typeof EndTripDateSchema>
export interface EndTripDate extends EndTripDateType {}

interface EndTripDateProps {
  value : Date
}

export const newEndTripDateSchema = (props : EndTripDateProps): EndTripDate => {
  return EndTripDateSchema.parse( {
    value : props.value,
  } )
}
