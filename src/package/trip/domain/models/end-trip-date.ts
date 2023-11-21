import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const EndTripDateSchema = z.object( {
	value: z.date()
} )
                                  .transform( ( val, ctx ) => {
	                                  val.value =
		                                  new Date( val.value.getTime() + 12096e5 )
	                                  // if ( val.value < now || val.value > limitDate ) {
	                                  //   ctx.addIssue( {
	                                  //     code   : z.ZodIssueCode.custom,
	                                  //     message: "Not a valid date",
	                                  //   } );
	                                  //   return z.NEVER;
	                                  // }
	                                  return val
                                  } )

type EndTripDateType = z.infer<typeof EndTripDateSchema>

export interface EndTripDate extends EndTripDateType {}

interface EndTripDateProps {
	value: Date
}

/**
 * Create end trip date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newEndTripDate = ( props: EndTripDateProps ): Result<EndTripDate, Error> => {
	const result = EndTripDateSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DateInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
