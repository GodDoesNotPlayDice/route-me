import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { PassengerBirthDayInvalidException } from 'src/package/passenger/domain/exceptions/passenger-birth-day-invalid-exception'
import { z } from 'zod'

export const PassengerBirthDaySchema = z.object( {
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

type PassengerBirthDayType = z.infer<typeof PassengerBirthDaySchema>

export interface PassengerBirthDay extends PassengerBirthDayType {}

export interface PassengerBirthDayProps {
  value: Date
}

/**
 * Create a passenger birthday instance
 * @throws {PassengerBirthDayInvalidException} - if birthday is invalid
 */
export const newPassengerBirthDay = ( props: PassengerBirthDayProps ): Result<PassengerBirthDay, Error> => {
  const result = PassengerBirthDaySchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new PassengerBirthDayInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
