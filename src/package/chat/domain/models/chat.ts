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

export const newChat = ( props: ChatProps ): Chat => {
  return {
    id    : newChatID( {
      value: props.id
    } ),
    tripID: props.tripID
  }
}
