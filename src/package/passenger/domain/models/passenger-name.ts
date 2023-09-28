import { z } from 'zod'

export const PassengerNameSchema = z.object( {
  value : z.string().email()
} )

export type PassengerName = z.infer<typeof PassengerNameSchema>

interface PassengerNameProps {
  value : string
}

export const newPassengerName = (props : PassengerNameProps): PassengerName => {
  return PassengerNameSchema.parse( {
    value : props.value
  } )
}
