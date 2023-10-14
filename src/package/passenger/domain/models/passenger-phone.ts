import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PhoneExceedsMaximumLengthException } from 'src/package/passenger/domain/exceptions/phone-exceeds-maximum-length-exception'
import { PhoneInsufficientLengthException } from 'src/package/passenger/domain/exceptions/phone-insufficient-length-exception'
import { PhoneInvalidFormatException } from 'src/package/passenger/domain/exceptions/phone-invalid-format-exception'
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
 * @throws {PhoneInvalidFormatException} - if phone format is invalid
 * @throws {PhoneInsufficientLengthException} - if length is insufficient
 * @throws {PhoneExceedsMaximumLengthException} - if length exceeds maximum
 */
export const newPassengerPhone = ( props: PassengerPhoneProps ): Result<PassengerPhone, Error[]> => {
  const result = PassengerPhoneSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    const error: Error[] = []
    for ( const e of result.error.errors ) {
      if(e.code === 'too_small'){
        error.push(new PhoneInsufficientLengthException(String(e.minimum)) )
      }
      else if(e.code === 'too_big'){
        error.push(new PhoneExceedsMaximumLengthException(String(e.maximum)) )
      }
      else {
        error.push(new PhoneInvalidFormatException() )
      }
    }
    return Err( error )
  }
  else {
    return Ok( result.data )
  }
}
