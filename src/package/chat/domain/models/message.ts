import { MessageContent } from 'src/package/chat/domain/models/message-content'
import { MessageID } from 'src/package/chat/domain/models/message-id'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Email } from 'src/package/shared/domain/models/email'

export interface Message {
  id: MessageID,
  passengerName: PassengerName
  passengerEmail: Email
  content: MessageContent
}
