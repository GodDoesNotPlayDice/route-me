import { z } from 'zod'

export const PassengerCountrySchema = z.object( {
  value : z.string()
} )

type PassengerCountryType = z.infer<typeof PassengerCountrySchema>
export interface PassengerCountry extends PassengerCountryType {}

export interface PassengerCountryProps {
  value : string
}

export const newPassengerCountry = (props : PassengerCountryProps): PassengerCountry => {
  return PassengerCountrySchema.parse( {
    value : props.value
  } )
}
