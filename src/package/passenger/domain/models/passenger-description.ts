import { z } from 'zod'

export const PassengerDescriptionSchema = z.object( {
  value : z.string()
} )

type PassengerDescriptionType = z.infer<typeof PassengerDescriptionSchema>
export interface PassengerDescription extends PassengerDescriptionType{}

export interface PassengerDescriptionProps {
  value : string
}

export const newPassengerDescription = (props : PassengerDescriptionProps): PassengerDescription => {
  return PassengerDescriptionSchema.parse( {
    value : props.value
  } )
}
