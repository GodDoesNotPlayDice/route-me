import { z } from 'zod'

export const PassengerPhoneSchema = z.object( {
  value : z.string().email()
    // z.string().regex(RegExp('^\\(\\+\\d+\\)\\s\\d{4}-\\d{4}')).parse(value);
} )

type PassengerPhoneType = z.infer<typeof PassengerPhoneSchema>

export interface PassengerPhone extends PassengerPhoneType{}

export interface PassengerPhoneProps {
  value : string
}

export const newPassengerPhone = (props : PassengerPhoneProps): PassengerPhone => {
  return PassengerPhoneSchema.parse( {
    value : props.value
  } )
}
