import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Message } from 'src/package/chat/domain/models/message'
import { newMessageContent } from 'src/package/chat/domain/models/message-content'
import { newMessageID } from 'src/package/chat/domain/models/message-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from message instance
 * @throws {UnknownException} - if unknown error
 */
export const messageToJson = ( message: Message ): Result<Record<string, any>, Error> => {
  try {
    const json: Record<string, any> = {
      id     : message.id.value,
      content: message.content.value
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
 */
export const messageFromJson = ( json: Record<string, any> ): Result<Message, Error[]> => {
  const errors: Error[] = []

  const id              = newMessageID( {
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

  if ( errors.length > 0 ) {
    return Err( errors )
  }

  return Ok( {
    id     : id.unwrap(),
    content: content.unwrap()
  } )
}
