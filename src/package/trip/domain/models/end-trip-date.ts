import { z } from 'zod'

export const EndTripDateSchema = z.object( {
  value : z.date()
} ).transform( ( val, ctx ) => {
  const twoWeeks          = new Date( val.value.getTime() + 12096e5 )
  val.value = twoWeeks
  return val
})

type EndTripDateType = z.infer<typeof EndTripDateSchema>
export interface EndTripDate extends EndTripDateType {}

export interface EndTripDateProps {
  value : Date
}

export const newEndTripDate = (props : EndTripDateProps): EndTripDate => {
  return EndTripDateSchema.parse( {
    value : props.value,
  } )
}
