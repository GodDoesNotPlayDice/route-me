import { z } from 'zod'

export const PassengerCountrySchema = z.object( {
  value : z.string()
} )

export type PassengerCountry = z.infer<typeof PassengerCountrySchema>

interface PassengerCountryProps {
  value : string
}

export const newPassengerCountry = (props : PassengerCountryProps): PassengerCountry => {
  return PassengerCountrySchema.parse( {
    value : props.value
  } )
}
