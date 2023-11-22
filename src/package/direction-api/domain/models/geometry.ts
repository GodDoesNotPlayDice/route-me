import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { GeometryInvalidException } from 'src/package/direction-api/domain/exceptions/geometry-invalid-exception'
import { z } from 'zod'

export const GeometrySchema = z.object( {
	values: z.array( z.array( z.number() ) )
	         .min( 1 )
} )
type GeometryType = z.infer<typeof GeometrySchema>

export interface Geometry extends GeometryType {}

export interface GeometryProps {
	values: Array<number[]>;
}

/**
 * Create geometry instance
 * @throws {GeometryInvalidException} - if geometry is invalid
 */
export const newGeometry = ( props: GeometryProps ): Result<Geometry, Error> => {
	const result = GeometrySchema.safeParse( {
		values: props.values
	} )

	if ( !result.success ) {
		return Err( new GeometryInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}

