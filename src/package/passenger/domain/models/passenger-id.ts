import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { PassengerIdInvalidException } from 'src/package/passenger/domain/exceptions/passenger-id-invalid-exception'
import { z } from 'zod'

export const PassengerIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type PassengerIDType = z.infer<typeof PassengerIDSchema>

export interface PassengerID extends PassengerIDType {}

interface PassengerIDProps {
	value: string
}

/**
 * Create a user id instance
 * @throws {PassengerIdInvalidException} - if id is invalid
 */
export const newPassengerID = ( props: PassengerIDProps ): Result<PassengerID, Error> => {
	const result = PassengerIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new PassengerIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
