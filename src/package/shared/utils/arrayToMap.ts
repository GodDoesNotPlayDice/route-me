import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PropertyKeyInvalidException } from 'src/package/shared/utils/exceptions/property-key-invalid-exception'

export function arrayToMap<T>( lista: T[],
	key: keyof T ): Result<Map<string, T>, Error[]> {
	const errors: Error[]           = []
	const resultMap: Map<string, T> = new Map<string, T>()
	for ( const elemento of lista ) {
		const objectLength = Object.entries( elemento[key] as any ).length

		if ( objectLength === 1 &&
			( elemento[key] as any ).hasOwnProperty( 'value' ) )
		{
			// @ts-ignore
			resultMap.set( elemento[key].value as string, elemento )
		}
		else if ( objectLength === 1 ) {
			resultMap.set( elemento[key] as string, elemento )
		}
		else {
			errors.push( new PropertyKeyInvalidException(
				'El objeto tiene mas de una propiedad' ) )
		}
	}
	if ( errors.length > 0 ) {
		return Err( errors )
	}
	return Ok( resultMap )
}
