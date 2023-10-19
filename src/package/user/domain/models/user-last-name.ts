import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserLastNameInvalidException } from 'src/package/user/domain/exceptions/user-last-name-invalid-exception'
import { z } from 'zod'

export const UserLastNameSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type UserLastNameType = z.infer<typeof UserLastNameSchema>

export interface UserLastName extends UserLastNameType {}

export interface UserLastNameProps {
  value: string
}

/**
 * Create a passenger last name instance
 * @throws {UserLastNameInvalidException} - if last name is invalid
 */
export const newUserLastName = ( props: UserLastNameProps ): Result<UserLastName, Error> => {

  const result = UserLastNameSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserLastNameInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
