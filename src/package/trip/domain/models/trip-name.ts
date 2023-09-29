import { z } from 'zod'

export const TripNameSchema = z.object( {
  value: z.string()
} )

type TripNameType = z.infer<typeof TripNameSchema>

export interface TripName extends TripNameType {}

interface TripNameProps {
  value: string
}

export const newTripName = ( props: TripNameProps ): TripName => {
  return TripNameSchema.parse( {
    value: props.value
  } )
}
