import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  MessageContent,
  newMessageContent
} from 'src/package/chat/domain/models/message-content'
import {
  MessageID,
  newMessageID
} from 'src/package/chat/domain/models/message-id'

export interface Message {
  id: MessageID,
  content: MessageContent
}

export interface MessageProps {
  id: string
  content: string
}

/**
 * Create Message instance
 * @throws {MessageIdInvalidException} - if id is invalid
 * @throws {MessageContentInvalidException} - if content is invalid
 */
export const newMessage = ( props: MessageProps ): Result<Message, Error[]> => {
  const errors: Error[] = []
  const id              = newMessageID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    errors.push( id.unwrapErr() )
  }

  const content = newMessageContent( {
    value: props.content
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
