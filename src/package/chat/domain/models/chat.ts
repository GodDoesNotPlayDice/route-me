import { TripID } from 'src/package/trip/domain'
import {
  ChatID,
  newChatID
} from '.'

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
