import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { NumberInvalidException } from 'src/package/shared/domain/exceptions/number-invalid-exception'
import { z } from 'zod'

export const ValidNumberSchema = z.object( {
	value: z.number()
	        .gte( 0 )
} )

type ValidNumberType = z.infer<typeof ValidNumberSchema>

export interface ValidNumber extends ValidNumberType {}

export interface ValidNumberProps {
	value: number
}

/**
 * Create a valid date instance
 * @throws {NumberInvalidException} - if number is invalid
 */
export const newValidNumber = ( props: ValidNumberProps ): Result<ValidNumber, Error> => {
	const result = ValidNumberSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new NumberInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
