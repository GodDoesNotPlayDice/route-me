import { z } from 'zod'

export const PassengerNameSchema = z.object( {
  value : z.string()
} )

type PassengerNameType = z.infer<typeof PassengerNameSchema>

export interface PassengerName extends PassengerNameType {}

export interface PassengerNameProps {
  value : string
}

export const newPassengerName = (props : PassengerNameProps): PassengerName => {
  return PassengerNameSchema.parse( {
    value : props.value
  } )
}
