import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Driver,
	newDriver
} from 'src/package/driver/domain/models/driver'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from driver instance
 * @throws {UnknownException} - if unknown error
 */
export const driverToJson = ( driver: Driver ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id       : driver.id.value,
			userID   : driver.userID.value,
			documents: driver.documents.map( ( document ) => document.value )
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error driver to json' )
		return Err( err )
	}
}

/**
 * Create a driver instance from json
 * @throws {DriverIdInvalidException} - if id is invalid
 * @throws {DriverDocumentIdInvalidException} - if id is invalid
 */
export const driverFromJson = ( json: Record<string, any> ): Result<Driver, Error[]> => {

	const documents = Object.values( json['documents'] )
	                        .map( ( document ) => document as string )

	const result = newDriver( {
		id       : json['id'],
		userID   : json['userID'],
		documents: documents
	} )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
