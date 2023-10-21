import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Message } from 'src/package/message/domain/models/message'
import { newMessageContent } from 'src/package/message/domain/models/message-content'
import { newMessageID } from 'src/package/message/domain/models/message-id'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'

/**
 * Create a json from message instance
 * @throws {UnknownException} - if unknown error
 */
export const messageToJson = ( message: Message ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id             : message.id.value,
      passenger_name : message.passengerName.value,
      passenger_email: message.passengerEmail.value,
      content        : message.content.value
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error message to json' )
    return Err( err )
  }
}

/**
 * Create a message instance from json
 * @throws {MessageIdInvalidException} - if id is invalid
 * @throws {MessageContentInvalidException} - if content is invalid
 * @throws {EmailInvalidException} - if email is invalid
 * @throws {PassengerNameInvalidException} - if name is invalid
 */
export const messageFromJson = ( json: Record<string, any> ): Result<Message, Error[]> => {
  const errors: Error[] = []

  const id = newMessageID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    errors.push( id.unwrapErr() )
  }

  const content = newMessageContent( {
    value: json['content'] ?? ''
  } )

  if ( content.isErr() ) {
    errors.push( content.unwrapErr() )
  }

  const passengerEmail = newEmail({
    value: json['passenger_email'] ?? ''
  })

  if ( passengerEmail.isErr() ) {
    errors.push( passengerEmail.unwrapErr() )
  }

  const passengerName = newPassengerName({
    value: json['passenger_name'] ?? ''
  })

  if ( passengerName.isErr() ) {
    errors.push( passengerName.unwrapErr() )
  }

  if ( errors.length > 0 ) {
    return Err( errors )
  }

  return Ok( {
    id            : id.unwrap(),
    content       : content.unwrap(),
    passengerName : passengerName.unwrap(),
    passengerEmail: passengerEmail.unwrap()
  } )
}
