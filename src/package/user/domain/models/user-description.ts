import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserDescriptionInvalidException } from 'src/package/user/domain/exceptions/user-description-invalid-exception'
import { z } from 'zod'

export const UserDescriptionSchema = z.object( {
  value: z.string()
} )

type UserDescriptionType = z.infer<typeof UserDescriptionSchema>

export interface UserDescription extends UserDescriptionType {}

export interface UserDescriptionProps {
  value: string
}

/**
 * Create a passenger description instance
 * @throws {UserDescriptionInvalidException} - if description is invalid
 */
export const newUserDescription = ( props: UserDescriptionProps ): Result<UserDescription, Error> => {
  const result = UserDescriptionSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserDescriptionInvalidException() )
  }
  else {
    return Ok( result.data )
  }

}
