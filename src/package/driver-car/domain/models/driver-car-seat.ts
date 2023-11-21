import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCarSeatInvalidException } from 'src/package/driver-car/domain/exceptions/driver-car-seat-invalid-exception'
import { z } from 'zod'

export const DriverCarSeatSchema = z.object( {
	value: z.number()
	        .nonnegative()
} )

type DriverCarSeatType = z.infer<typeof DriverCarSeatSchema>

export interface DriverCarSeat extends DriverCarSeatType {}

interface DriverCarSeatProps {
	value: number
}

/**
 * Create driver car seat instance
 * @throws {DriverCarSeatInvalidException} - if seat is invalid
 */
export const newDriverCarSeat = ( props: DriverCarSeatProps ): Result<DriverCarSeat, Error> => {
	const result = DriverCarSeatSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new DriverCarSeatInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
