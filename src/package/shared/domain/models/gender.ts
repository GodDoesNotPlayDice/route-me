import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { GenderInvalidException } from 'src/package/shared/domain/exceptions/gender-invalid-exception'
import { z } from 'zod'

export enum GenderEnum {
	Male   = 'Male',
	Female = 'Female',
	None   = 'None'
}

export const GenderEnumSchema = z.nativeEnum( GenderEnum )

export type Gender = z.infer<typeof GenderEnumSchema>

interface GenderProps {
	value: string
}

/**
 * Create a gender instance
 * @throws {GenderInvalidException} - if gender is invalid
 */
export const newGender = ( props: GenderProps ): Result<Gender, Error> => {
	const result = GenderEnumSchema.safeParse( props.value )

	if ( !result.success ) {
		return Err( new GenderInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}

