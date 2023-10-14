import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const UpdatedAtSchema = z.object( {
  value : z.date(),
  createdAt: z.date()
} ).superRefine( ( val, ctx ) => {
  if ( val.value < val.createdAt ) {
    ctx.addIssue( {
      code   : z.ZodIssueCode.custom,
      message: "Not a valid date",
    } );
    return z.NEVER;
  }
  return val
})

type UpdatedAtType = z.infer<typeof UpdatedAtSchema>
export interface UpdatedAt extends UpdatedAtType{}

interface UpdatedAtProps {
	value: Date,
	createdAt: Date
}

/**
 * Create update at instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newUpdatedAt = ( props: UpdatedAtProps ): Result<UpdatedAt, Error> => {
  const result = UpdatedAtSchema.safeParse( {
    value: props.value,
    createdAt: props.createdAt
  } )

  if ( !result.success ) {
    return Err( new DateInvalidException() )
  }
  else {
    return Ok(result.data)
  }
	}
