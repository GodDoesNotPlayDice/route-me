import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const CreatedAtSchema = z.object( {
  value: z.date()
} )
                                .superRefine( ( val, ctx ) => {
                                  const now          = new Date()
                                  const oneSecondAgo = new Date(
                                    now.getTime() - 1000 )
                                  if ( val.value < oneSecondAgo ) {
                                    ctx.addIssue( {
                                      code   : z.ZodIssueCode.custom,
                                      message: 'Not a valid date'
                                    } )
                                    return z.NEVER
                                  }
                                  return val
                                } )

type CreatedAtType = z.infer<typeof CreatedAtSchema>

export interface CreatedAt extends CreatedAtType {}

interface CreatedAtProps {
  value: Date
}

/**
 * Create a created at instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newCreatedAt = ( props: CreatedAtProps ): Result<CreatedAt, Error> => {
  const result = CreatedAtSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new DateInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
