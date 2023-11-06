import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { newDriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { newDriverCarModel } from 'src/package/driver-car/domain/models/driver-car-model'
import { newDriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { newImageUrl } from 'src/package/shared/domain/models/image-url'
import { ulid } from 'ulidx'

export const createDriverCar = async ( dao: DriverCarDao,
	props: {
		model: string
		seat: number,
		image: string
	}
): Promise<Result<DriverCar, Error[]>> => {
	const err: Error[] = []

	const id = newDriverCarID( {
		value: ulid()
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const model = newDriverCarModel( {
		value: props.model
	} )

	if ( model.isErr() ) {
		err.push( model.unwrapErr() )
	}

	const seat = newDriverCarSeat( {
		value: props.seat
	} )

	if ( seat.isErr() ) {
		err.push( seat.unwrapErr() )
	}

	const image = newImageUrl( {
		value: props.image
	} )

	if ( image.isErr() ) {
		err.push( image.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const result: DriverCar = {
		id   : id.unwrap(),
		model: model.unwrap(),
		seat : seat.unwrap(),
		image: image.unwrap()
	}

	const response = await dao.create( result )

	if ( response.isErr() ) {
		err.push( response.unwrapErr() )
		return Err( err )
	}

	return Ok( result )
}
