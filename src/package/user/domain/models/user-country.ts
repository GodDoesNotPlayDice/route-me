import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserCountryInvalidException } from 'src/package/user/domain/exceptions/user-country-invalid-exception'
import { z } from 'zod'

export const UserCountrySchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type UserCountryType = z.infer<typeof UserCountrySchema>

export interface UserCountry extends UserCountryType {}

export interface UserCountryProps {
  value: string
}

/**
 * Create a passenger country instance
 * @throws {UserCountryInvalidException} - if country is invalid
 */
export const newUserCountry = ( props: UserCountryProps ): Result<UserCountry, Error> => {
  const result = UserCountrySchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserCountryInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
