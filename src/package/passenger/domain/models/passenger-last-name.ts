import { z } from 'zod'

export const PassengerLastNameSchema = z.object( {
  value : z.string().email()
} )

export type PassengerLastName = z.infer<typeof PassengerLastNameSchema>

interface PassengerLastNameProps {
  value : string
}

export const newPassengerLastName = (props : PassengerLastNameProps): PassengerLastName => {
  return PassengerLastNameSchema.parse( {
    value : props.value
  } )
}
