import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CountryNameCodeInvalidException } from 'src/package/country-api/domain/exceptions/country-name-code-invalid-exception'
import { z } from 'zod'

export const CountryNameCodeSchema = z.object( {
	value: z.string()
} )

type CountryNameCodeType = z.infer<typeof CountryNameCodeSchema>

export interface CountryNameCode extends CountryNameCodeType {}

export interface CountryNameCodeProps{
	value: string
}

/**
 * Create country name code instance
 * @throws {CountryNameCodeInvalidException} - if name code is invalid
 */
export const newCountryNameCode = ( props: CountryNameCodeProps ): Result<CountryNameCode, Error> => {
	const result = CountryNameCodeSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new CountryNameCodeInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
