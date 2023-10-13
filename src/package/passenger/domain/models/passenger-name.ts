import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerNameInvalidException } from 'src/package/passenger/domain/exceptions/passenger-name-invalid-exception'
import { z } from 'zod'

export const PassengerNameSchema = z.object( {
  value : z.string().nonempty()
} )

type PassengerNameType = z.infer<typeof PassengerNameSchema>

export interface PassengerName extends PassengerNameType {}

export interface PassengerNameProps {
  value : string
}

/**
 * Create a passenger name instance
 * @throws {PassengerNameInvalidException} - if name is invalid
 */
export const newPassengerName = (props : PassengerNameProps): Result<PassengerName, Error> => {
  const result = PassengerNameSchema.safeParse( {
    value : props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerNameInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
