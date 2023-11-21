import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DateInvalidException } from 'src/package/shared/domain/exceptions/date-invalid-exception'
import { z } from 'zod'

// export enum ComparatorEnum {
// 	After  = 'After',
// 	Before = 'Before',
// }
export const ComparableDateSchema = ( valueAfter: boolean ) => z.object( {
	value    : z.date(),
	otherDate: z.date()
} )
                                                                .superRefine(
	                                                                ( val,
		                                                                ctx ) => {
		                                                                // Before: si value debe ir antes, value no puede ser mayor que la otra fecha
		                                                                if ( !valueAfter &&
			                                                                val.otherDate <
			                                                                val.value )
		                                                                {
			                                                                ctx.addIssue(
				                                                                {
					                                                                code   : z.ZodIssueCode.custom,
					                                                                message: 'Other date is greater than value'
				                                                                } )
			                                                                return z.NEVER
		                                                                }
		                                                                // After: si value debe ir despues, value no puede ser menor que la otra fecha
		                                                                else if ( valueAfter &&
			                                                                val.value <
			                                                                val.otherDate )
		                                                                {
			                                                                ctx.addIssue(
				                                                                {
					                                                                code   : z.ZodIssueCode.custom,
					                                                                message: 'Value is greater than other date'
				                                                                } )
			                                                                return z.NEVER
		                                                                }
		                                                                else {
			                                                                // if ( after && val.value > val.otherDate ) {
			                                                                // if ( !after && val.otherDate > val.value ) {
			                                                                return val
		                                                                }
	                                                                } )

// type ComparableDateType = z.infer<typeof ComparableDateSchema>

// export interface ComparableDate extends ComparableDateType {}
export interface ComparableDate {
	value: Date
	otherDate: Date
}

interface ComparableDateProps {
	value: Date
	otherDate: Date
	valueAfter: boolean
}

/**
 * Create a comparable date instance
 * @throws {DateInvalidException} - if date is invalid
 */
export const newComparableDate = ( props: ComparableDateProps ): Result<ComparableDate, Error> => {
	const result = ComparableDateSchema( props.valueAfter )
		.safeParse( {
			value    : props.value,
			otherDate: props.otherDate
		} )

	if ( !result.success ) {
		return Err( new DateInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
