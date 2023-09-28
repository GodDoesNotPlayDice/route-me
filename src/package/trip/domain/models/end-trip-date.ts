import { z } from 'zod'

export const EndTripDateSchema = z.object( {
  value : z.date(),
  createdAt : z.date()
} ).transform( ( val, ctx ) => {
  const twoWeeks          = new Date( val.createdAt.getTime() + 12096e5 )
  val.value = twoWeeks
  return val
})

export type EndTripDateSchema = z.infer<typeof EndTripDateSchema>

interface EndTripDateProps {
  value : Date
  createdAt : Date
}

export const newEndTripDateSchema = (props : EndTripDateProps): EndTripDateSchema => {
  return EndTripDateSchema.parse( {
    value : props.value,
    createdAt : props.value
  } )
}
