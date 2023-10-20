import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const ValidDateSchema = z.object( {
  value: z.date()
} )

type ValidDateType = z.infer<typeof ValidDateSchema>

export interface ValidDate extends ValidDateType {}

interface ValidDateProps {
  value: Date
}

/**
 * Create a valid date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newValidDate = ( props: ValidDateProps ): Result<ValidDate, Error> => {
  const result = ValidDateSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new DateInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
