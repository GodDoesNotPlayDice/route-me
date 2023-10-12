import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerPhoneInvalidException } from 'src/package/passenger/domain/exceptions/passenger-phone-invalid-exception'
import { z } from 'zod'

export const PassengerPhoneSchema = z.object( {
  value: z.string()
          .min( 8 )
          .max( 9 )
  .regex(RegExp(/^[0-9]+$/))
  // z.string().regex(RegExp('^\\(\\+\\d+\\)\\s\\d{4}-\\d{4}')).parse(value);
} )

type PassengerPhoneType = z.infer<typeof PassengerPhoneSchema>

export interface PassengerPhone extends PassengerPhoneType {}

export interface PassengerPhoneProps {
  value: string
}

/**
 * Create a passenger phone instance
 * @throws {PassengerPhoneInvalidException} - if phone is invalid
 */
export const newPassengerPhone = ( props: PassengerPhoneProps ): Result<PassengerPhone, Error> => {
  const result = PassengerPhoneSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerPhoneInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
