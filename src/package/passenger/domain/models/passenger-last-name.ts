import { z } from 'zod'

export const PassengerLastNameSchema = z.object( {
  value: z.string()
} )

type PassengerLastNameType = z.infer<typeof PassengerLastNameSchema>

export interface PassengerLastName extends PassengerLastNameType {}

export interface PassengerLastNameProps {
  value: string
}

export const newPassengerLastName = ( props: PassengerLastNameProps ): PassengerLastName => {
  return PassengerLastNameSchema.parse( {
    value: props.value
  } )
}
