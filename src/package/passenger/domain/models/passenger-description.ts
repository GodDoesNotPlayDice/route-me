import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerDescriptionInvalidException } from 'src/package/passenger/domain/exceptions/passenger-description-invalid-exception'
import { z } from 'zod'

export const PassengerDescriptionSchema = z.object( {
  value: z.string()
} )

type PassengerDescriptionType = z.infer<typeof PassengerDescriptionSchema>

export interface PassengerDescription extends PassengerDescriptionType {}

export interface PassengerDescriptionProps {
  value: string
}

/**
 * Create a passenger description instance
 * @throws {PassengerDescriptionInvalidException} - if description is invalid
 */
export const newPassengerDescription = ( props: PassengerDescriptionProps ): Result<PassengerDescription, Error> => {
  const result = PassengerDescriptionSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerDescriptionInvalidException() )
  }
  else {
    return Ok( result.data )
  }

}
