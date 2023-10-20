import { MessageContent } from 'src/package/chat/domain/models/message-content'
import { MessageID } from 'src/package/chat/domain/models/message-id'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export interface Message {
  id: MessageID,
  passengerOwner: Passenger
  content: MessageContent
}
