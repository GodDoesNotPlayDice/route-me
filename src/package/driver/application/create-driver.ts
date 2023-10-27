import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { newDriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { newDriverCarModel } from 'src/package/driver-car/domain/models/driver-car-model'
import { newDriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { DriverDocument } from 'src/package/driver-document/domain/models/driver-document'
import { newDriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'
import { newDriverDocumentName } from 'src/package/driver-document/domain/models/driver-document-name'
import { newDriverDocumentReference } from 'src/package/driver-document/domain/models/driver-document-reference'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { newDriverID } from 'src/package/driver/domain/models/driver-id'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { ulid } from 'ulidx'

/**
 * Create Driver
 */
export const createDriver = async ( dao: DriverDao,
	props: {
		passenger: Passenger,
		seat: number,
		model: string,
		documents: {
			id: string,
			name: string,
			reference: string
		}[]
	}
): Promise<Result<Driver, Error[]>> => {
	const error: Error[] = []

	const id = newDriverID( {
		value: ulid()
	} )

	if ( id.isErr() ) {
		error.push( id.unwrapErr() )
	}

	const carID = newDriverCarID( {
		value: ulid()
	} )

	if ( carID.isErr() ) {
		error.push( carID.unwrapErr() )
	}

	const model = newDriverCarModel( {
		value: props.model
	} )

	if ( model.isErr() ) {
		error.push( model.unwrapErr() )
	}

	const seat = newDriverCarSeat( {
		value: props.seat
	} )

	if ( seat.isErr() ) {
		error.push( seat.unwrapErr() )
	}

	const driverCar: DriverCar = {
		id   : carID.unwrap(),
		model: model.unwrap(),
		seat : seat.unwrap()
	}

	const driverDocuments: DriverDocument[] = []

	for ( const doc of props.documents ) {
		const docID = newDriverDocumentID( {
			value: doc.id
		} )

		if ( docID.isErr() ) {
			error.push( docID.unwrapErr() )
		}

		const name = newDriverDocumentName( {
			value: doc.name
		} )

		if ( name.isErr() ) {
			error.push( name.unwrapErr() )
		}

		const ref = newDriverDocumentReference( {
			value: doc.reference
		} )

		if ( ref.isErr() ) {
			error.push( ref.unwrapErr() )
		}

		if ( error.length > 0 ) {
			break
		}

		driverDocuments.push( {
			id       : docID.unwrap(),
			name     : name.unwrap(),
			reference: ref.unwrap()
		} )
	}

	if ( error.length > 0 ) {
		return Err( error )
	}

	const driver: Driver = {
		id       : id.unwrap(),
		passenger: props.passenger,
		car      : driverCar,
		documents: driverDocuments
	}

	const result = await dao.create( driver )

	if ( result.isErr() ) {
		error.push( ...result.unwrapErr() )
		return Err( error )
	}

	return Ok( driver )
}
