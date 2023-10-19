import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserNameInvalidException } from 'src/package/user/domain/exceptions/user-name-invalid-exception'
import { z } from 'zod'

export const UserNameSchema = z.object( {
  value: z.string()
          .min( 1 )
} )

type UserNameType = z.infer<typeof UserNameSchema>

export interface UserName extends UserNameType {}

export interface UserNameProps {
  value: string
}

/**
 * Create a username instance
 * @throws {UserNameInvalidException} - if name is invalid
 */
export const newUserName = ( props: UserNameProps ): Result<UserName, Error> => {
  const result = UserNameSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserNameInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
