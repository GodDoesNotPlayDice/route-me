import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

export const LimitDateSchema = ( numTimes: number, after: boolean ) => z.object(
	{
		value: z.date()
	} )
                                                                        .transform(
	                                                                        ( val,
		                                                                        ctx ) => {
		                                                                        const now       = new Date()
		                                                                        const limitDate = new Date(
			                                                                        now.getTime() +
			                                                                        numTimes ) // 12096e5

		                                                                        // After: si value debe ir despues, value no puede ser menor que la otra fecha
		                                                                        if ( after &&
			                                                                        val.value <
			                                                                        limitDate )
		                                                                        {
			                                                                        ctx.addIssue(
				                                                                        {
					                                                                        code   : z.ZodIssueCode.custom,
					                                                                        message: 'Value is less than limit date'
				                                                                        } )
			                                                                        return z.NEVER
		                                                                        }
			                                                                        // Before: si value debe ir antes y superior que la fecha actual
		                                                                        // value no puede ser mayor que la otra fecha
		                                                                        else if ( !after &&
			                                                                        val.value >
			                                                                        limitDate ||
			                                                                        val.value <
			                                                                        now )
		                                                                        {
			                                                                        ctx.addIssue(
				                                                                        {
					                                                                        code   : z.ZodIssueCode.custom,
					                                                                        message: 'Value is greater than limit date'
				                                                                        } )
			                                                                        return z.NEVER
		                                                                        }
		                                                                        else {
			                                                                        // if ( after && val.value > limitDate )
			                                                                        //   else if ( !after && val.value < limitDate && val.value > now)
			                                                                        return val
		                                                                        }
	                                                                        } )
// type LimitDateType = z.infer<typeof LimitDateSchema>
// export interface LimitDate extends LimitDateType {}
export interface LimitDate {
	value: Date
}

interface LimitDateProps {
	value: Date
	numTimes: number
	after: boolean
}

/**
 * Create a limit date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newLimitDate = ( props: LimitDateProps ): Result<LimitDate, Error> => {
	const result = LimitDateSchema( props.numTimes, props.after )
		.safeParse( {
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
