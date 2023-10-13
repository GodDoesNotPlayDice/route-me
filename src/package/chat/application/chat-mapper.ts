import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Chat,
	newChat
} from 'src/package/chat/domain/models/chat'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newTripID } from 'src/package/trip/domain/models/trip-id'

/**
 * Create a json from chat instance
 * @throws {UnknownException} - if unknown error
 */
export const chatToJson = ( chat: Chat ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id    : chat.id.value,
			tripID: chat.tripID.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error chat to json' )
		return Err( err )
	}
}

/**
 * Create a chat instance from json
 * @throws {ChatIdInvalidException} - if id is invalid
 * @throws {TripIdInvalidException} - if id is invalid
 */
export const chatFromJson = ( json: Record<string, any> ): Result<Chat, Error[]> => {

	const err: Error[] = []

	const tripID = newTripID( {
		value: json['tripID']
	} )

	if ( tripID.isErr() ) {
		err.push( tripID.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	const result = newChat( {
		id    : json['id'],
		tripID: tripID.unwrap()
	} )

	if ( result.isErr() ) {
		err.push( result.unwrapErr() )
		return Err( err )
	}

	return Ok( result.unwrap() )
}
