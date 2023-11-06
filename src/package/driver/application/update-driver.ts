import {
	Err,
	Ok,
	Result,
	Some
} from 'oxide.ts'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import {
	DriverDocument,
	DriverDocumentProps
} from 'src/package/driver-document/domain/models/driver-document'
import { newDriverDocumentID } from 'src/package/driver-document/domain/models/driver-document-id'
import { newDriverDocumentName } from 'src/package/driver-document/domain/models/driver-document-name'
import { newDriverDocumentReference } from 'src/package/driver-document/domain/models/driver-document-reference'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Trip } from 'src/package/trip/domain/models/trip'

export const updateDriver = async ( dao: DriverDao, driver: Driver, props: {
	documents?: DriverDocumentProps[]
	activeTrip?: Trip
	carID?: DriverCarID
} ): Promise<Result<Driver, Error[]>> => {
	const error: Error[] = []

	let driverDocuments: DriverDocument[] = []
	if ( props.documents !== undefined &&
		props.documents.length > 0 )
	{
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
	}
	else {
		driverDocuments = driver.documents
	}
	const newDriver: Driver = {
		id        : driver.id,
		enabled   : driver.enabled,
		activeTrip: props.activeTrip === undefined ? driver.activeTrip : Some(
			props.activeTrip ),
		passenger : driver.passenger,
		carID     : props.carID ?? driver.carID,
		documents : driverDocuments
	}

	const result = await dao.update( newDriver )

	if ( result.isErr() ) {
		return Err( [ result.unwrapErr() ] )
	}

	return Ok( newDriver )
}
