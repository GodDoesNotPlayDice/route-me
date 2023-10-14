import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerLastNameInvalidException } from 'src/package/passenger/domain/exceptions/passenger-last-name-invalid-exception'
import { z } from 'zod'

export const PassengerLastNameSchema = z.object( {
  value: z.string().nonempty()
} )

type PassengerLastNameType = z.infer<typeof PassengerLastNameSchema>

export interface PassengerLastName extends PassengerLastNameType {}

export interface PassengerLastNameProps {
  value: string
}

/**
 * Create a passenger last name instance
 * @throws {PassengerLastNameInvalidException} - if last name is invalid
 */
export const newPassengerLastName = ( props: PassengerLastNameProps ): Result<PassengerLastName, Error> => {

  const result = PassengerLastNameSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerLastNameInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
