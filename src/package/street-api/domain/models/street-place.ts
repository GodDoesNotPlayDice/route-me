import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { StreetPlaceInvalidException } from 'src/package/street-api/domain/exceptions/street-place-invalid-exception'
import { z } from 'zod'

export const StreetPlaceSchema = z.object( {
	value: z.string()
} )
type StreetPlaceType = z.infer<typeof StreetPlaceSchema>
export interface StreetPlace extends StreetPlaceType {}
export interface StreetPlaceProps {
	value: string
}

/**
 * Create a street place instance
 * @throws {StreetPlaceInvalidException} - if place is invalid
 */
export const newStreetPlace = ( props: StreetPlaceProps ): Result<StreetPlace, Error> => {
	const result = StreetPlaceSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new StreetPlaceInvalidException())
	}
	else {
		return Ok(result.data)
	}
}
