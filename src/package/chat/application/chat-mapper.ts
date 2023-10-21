import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Chat } from 'src/package/chat/domain/models/chat'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import {
  messageFromJson,
  messageToJson
} from 'src/package/message/application/message-mapper'
import { Message } from 'src/package/message/domain/models/message'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from chat instance
 * @throws {UnknownException} - if unknown error
 */
export const chatToJson = ( chat: Chat ): Result<Record<string, any>, Error[]> => {
  try {
    const json: Record<string, any> = {
      id: chat.id.value
    }

    const err: Error[] = []

    const messages: Record<string, any>[] = []

    for ( const message of chat.messages ) {
      const messageResult = messageToJson( message )

      if ( messageResult.isErr() ) {
        err.push( messageResult.unwrapErr() )
      }
      else {
        messages.push( messageResult.unwrap() )
      }
    }

    if ( messages.length > 0 ) {
      json['messages'] = messages
    }

    if ( err.length > 0 ) {
      return Err( err )
    }

    return Ok( json )
  }
  catch ( e ) {
    const err = e instanceof Error
      ? new UnknownException( e.message )
      : new UnknownException( 'error chat to json' )
    return Err( [ err ] )
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

  const messages: Message[] = []
  if ( json['messages'] !== undefined ) {
    for ( const message of Object.values( json['messages'] ) ) {
      const messageResult = messageFromJson(
        message as Record<string, any> )

      if ( messageResult.isErr() ) {
        errors.push( ...messageResult.unwrapErr() )
      }
      else {
        messages.push( messageResult.unwrap() )
      }
    }
  }

  if ( errors.length > 0 ) {
    return Err( errors )
  }

  return Ok( {
      id      : id.unwrap(),
      messages: messages
    }
  )
}
