import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PasswordInvalidException } from 'src/package/user/domain/exceptions/password-invalid-exception'
import { z } from 'zod'

export const UserPasswordSchema = z.object( {
  value: z.string()
          .min( 8 )
} )

type UserPasswordType = z.infer<typeof UserPasswordSchema>

export interface UserPassword extends UserPasswordType {}

interface UserPasswordProps {
  value: string
}

/**
 * Create a user password instance
 * @throws {PasswordInvalidException} - if password is invalid
 */
export const newUserPassword = ( props: UserPasswordProps ): Result<UserPassword, Error> => {
  const result = UserPasswordSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PasswordInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
