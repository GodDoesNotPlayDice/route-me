import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  Chat
} from 'src/package/chat/domain/models/chat'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
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
 * @throws {ChatIdInvalidException} - if chat id is invalid
 * @throws {TripIdInvalidException} - if trip id is invalid
 */
export const chatFromJson = ( json: Record<string, any> ): Result<Chat, Error[]> => {

  const errors: Error[] = []

  const id = newChatID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    errors.push( id.unwrapErr() )
  }

  const tripID = newTripID( {
    value: json['tripID'] ?? ''
  } )

  if ( tripID.isErr() ) {
    errors.push( tripID.unwrapErr() )
  }

  if ( errors.length > 0 ) {
    return Err( errors )
  }

  return Ok( {
      id    : id.unwrap(),
      tripID: tripID.unwrap()
    }
  )
}
