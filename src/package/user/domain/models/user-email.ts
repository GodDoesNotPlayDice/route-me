import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { EmailInvalidException } from 'src/package/user/domain/exceptions/email-invalid-exception'
import { z } from 'zod'

export const UserEmailSchema = z.object( {
  value : z.string().email()
} )

type UserEmailType = z.infer<typeof UserEmailSchema>
export interface UserEmail extends UserEmailType{}

interface UserEmailProps {
  value : string
}

/**
 * Create a user email instance
 * @throws {EmailInvalidException} - if email is invalid
 */
export const newUserEmail = (props : UserEmailProps): Result<UserEmail, Error> => {
  const result = UserEmailSchema.safeParse( {
    value : props.value
  } )

  if ( !result.success ) {
    return Err( new EmailInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
