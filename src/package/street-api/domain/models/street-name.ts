import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { StreetNameInvalidException } from 'src/package/street-api/domain/exceptions/street-name-invalid-exception'
import { z } from 'zod'

export const StreetNameSchema = z.object( {
  value: z.string()
} )
type StreetNameType = z.infer<typeof StreetNameSchema>

export interface StreetName extends StreetNameType {}

export interface StreetNameProps {
  value: string
}

/**
 * Create a street name instance
 * @throws {StreetNameInvalidException} - if name is invalid
 */
export const newStreetName = ( props: StreetNameProps ): Result<StreetName, Error> => {
  const result = StreetNameSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new StreetNameInvalidException() )
  }
  else {
    //TODO: revisar si llega value o manda mas de lo que deberia
    return Ok( result.data )
  }
}
