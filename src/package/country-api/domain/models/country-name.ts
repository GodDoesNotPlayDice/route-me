import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CountryNameInvalidException } from 'src/package/country-api/domain/exceptions/country-name-invalid-exception'
import { z } from 'zod'

export const CountryNameSchema = z.object( {
	common  : z.string(),
	official: z.string()
} )
type CountryNameType = z.infer<typeof CountryNameSchema>

export interface CountryName extends CountryNameType {}
export interface CountryNameProps{
	common  : string
	official: string
}

/**
 * Create country name instance
 * @throws {CountryNameInvalidException} - if name is invalid
 */
export const newCountryName = ( props: CountryNameProps ): Result<CountryName, Error> => {
	const result = CountryNameSchema.safeParse( {
		common  : props.common,
		official: props.official
	} )

	if ( !result.success ) {
		return Err( new CountryNameInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
