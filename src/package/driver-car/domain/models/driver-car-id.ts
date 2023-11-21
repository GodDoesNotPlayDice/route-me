import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCarIDInvalidException } from 'src/package/driver-car/domain/exceptions/driver-car-id-invalid-exception'
import { z } from 'zod'

export const DriverCarIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type DriverCarIDType = z.infer<typeof DriverCarIDSchema>

export interface DriverCarID extends DriverCarIDType {}

interface DriverCarIDProps {
	value: string
}

/**
 * Create driver car id instance
 * @throws {DriverCarIDInvalidException} - if id is invalid
 */
export const newDriverCarID = ( props: DriverCarIDProps ): Result<DriverCarID, Error> => {
	const result = DriverCarIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DriverCarIDInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
