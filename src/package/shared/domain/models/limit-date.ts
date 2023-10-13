import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

// 4/10
// 12096e5
// camino bueno: input: 10/10 --- (4/10 - 18/10) -> 10/10
// camino malo: input: 24/12 --- hoy*(4/10 - 18/10) -> error
// camino bueno: input: 24/12 --- (24/12 - 8/01) -> 10/10
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
