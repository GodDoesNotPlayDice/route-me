import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { newDriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { newDriverCarModel } from 'src/package/driver-car/domain/models/driver-car-model'
import { newDriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newImageUrl } from 'src/package/shared/domain/models/image-url'

/**
 * Create a json from driver car instance
 * @throws {UnknownException} - if unknown error
 */
export const driverCarToJson = ( driverCar: DriverCar ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id   : driverCar.id.value,
			seat : driverCar.seat.value,
			model: driverCar.model.value,
			image: driverCar.image.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error driver car to json' )
		return Err( err )
	}
}

/**
 * Create a driver car instance from json
 * @throws {DriverCarIDInvalidException} - if id is invalid
 * @throws {DriverCarModelInvalidException} - if model is invalid
 * @throws {DriverCarSeatInvalidException} - if seat is invalid
 */
export const driverCarFromJson = ( json: Record<string, any> ): Result<DriverCar, Error[]> => {
	const err: Error[] = []

	const id = newDriverCarID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const model = newDriverCarModel( {
		value: json['model'] ?? ''
	} )

	if ( model.isErr() ) {
		err.push( model.unwrapErr() )
	}

	const seat = newDriverCarSeat( {
		value: json['seat'] ?? ''
	} )

	if ( seat.isErr() ) {
		err.push( seat.unwrapErr() )
	}

	const image = newImageUrl( {
		value: json['image'] ?? ''
	} )

	if ( image.isErr() ) {
		err.push( image.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
			id   : id.unwrap(),
			model: model.unwrap(),
			seat : seat.unwrap(),
			image: image.unwrap()
		}
	)
}
