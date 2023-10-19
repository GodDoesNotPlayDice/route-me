import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { UserBirthDayInvalidException } from 'src/package/user/domain/exceptions/user-birth-day-invalid-exception'
import { z } from 'zod'

export const UserBirthDaySchema = z.object( {
  value: z.date()
} )
                                   .superRefine( ( val, ctx ) => {
                                     const currentDate = new Date()
                                     const date18years = new Date(
                                       currentDate.getFullYear() - 18,
                                       currentDate.getMonth(),
                                       currentDate.getDay()
                                     )
                                     if ( val.value >= date18years ) {
                                       ctx.addIssue( {
                                         code   : z.ZodIssueCode.custom,
                                         message: 'Not a valid date'
                                       } )
                                       return z.NEVER
                                     }
                                     return val
                                   } )

type UserBirthDayType = z.infer<typeof UserBirthDaySchema>

export interface UserBirthDay extends UserBirthDayType {}

export interface UserBirthDayProps {
  value: Date
}

/**
 * Create a passenger birthday instance
 * @throws {UserBirthDayInvalidException} - if birthday is invalid
 */
export const newUserBirthDay = ( props: UserBirthDayProps ): Result<UserBirthDay, Error> => {
  const result = UserBirthDaySchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new UserBirthDayInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
