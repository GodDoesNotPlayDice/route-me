import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const LimitDateSchema = z.object( {
  value   : z.date(),
  numTimes: z.number()
} )
                                .transform( ( val, ctx ) => {
                                  const now       = new Date()
                                  const limitDate = new Date(
                                    now.getTime() + val.numTimes ) // 12096e5
                                  if ( val.value < now || val.value >
                                    limitDate )
                                  {
                                    ctx.addIssue( {
                                      code   : z.ZodIssueCode.custom,
                                      message: 'Not a valid date'
                                    } )
                                    return z.NEVER
                                  }
                                  return val
                                } )

type LimitDateType = z.infer<typeof LimitDateSchema>

export interface LimitDate extends LimitDateType {}

interface LimitDateProps {
  value: Date
  numTimes: number
}

/**
 * Create a limit date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newLimitDate = ( props: LimitDateProps ): Result<LimitDate, Error> => {
  const result = LimitDateSchema.safeParse( {
    value   : props.value,
    numTimes: props.numTimes
  } )

  if ( !result.success ) {
    return Err( new DateInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
