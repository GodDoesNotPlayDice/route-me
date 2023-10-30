import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { BooleanInvalidException } from 'src/package/shared/domain/exceptions/boolean-invalid-exception'
import { z } from 'zod'

export const ValidBooleanSchema = z.object( {
	value: z.boolean()
} )

type ValidBooleanType = z.infer<typeof ValidBooleanSchema>

export interface ValidBoolean extends ValidBooleanType {}

interface ValidBooleanProps {
	value: boolean
}

/**
 * Create a valid date instance
 * @throws {BooleanInvalidException} - if number is invalid
 */
export const newValidBoolean = ( props: ValidBooleanProps ): Result<ValidBoolean, Error> => {
	const result = ValidBooleanSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new BooleanInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
