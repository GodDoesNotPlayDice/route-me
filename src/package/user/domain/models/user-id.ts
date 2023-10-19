import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserIdInvalidException } from 'src/package/user/domain/exceptions/user-id-invalid-exception'
import { z } from 'zod'

export const UserIDSchema = z.object( {
  value: z.string()
          .min( 1 )
} )
//TODO: ver zod brand

type UserIDType = z.infer<typeof UserIDSchema>

export interface UserID extends UserIDType {}

interface UserIDProps {
  value: string
}

/**
 * Create a user id instance
 * @throws {UserIdInvalidException} - if id is invalid
 */
export const newUserID = ( props: UserIDProps ): Result<UserID, Error> => {
  const result = UserIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
