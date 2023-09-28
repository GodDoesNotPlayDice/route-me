import { z } from 'zod'

export const PassengerDescriptionSchema = z.object( {
  value : z.string().min( 10 )
} )

export type PassengerDescription = z.infer<typeof PassengerDescriptionSchema>

interface PassengerDescriptionProps {
  value : string
}

export const newPassengerDescription = (props : PassengerDescriptionProps): PassengerDescription => {
  return PassengerDescriptionSchema.parse( {
    value : props.value
  } )
}
