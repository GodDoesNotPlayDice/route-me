import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  ChatID,
  newChatID
} from 'src/package/chat/domain/models/chat-id'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export interface Chat {
  id: ChatID,
  tripID: TripID
}

export interface ChatProps {
  id: string
  tripID: TripID
}

/**
 * Create chat instance
 * @throws {ChatIdInvalidException} - if id is invalid
 */
export const newChat = ( props: ChatProps ): Result<Chat, Error> => {
  const id = newChatID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    return Err( id.unwrapErr())
  }

  return Ok({
      id    : id.unwrap(),
      tripID: props.tripID
    }
  )
}
