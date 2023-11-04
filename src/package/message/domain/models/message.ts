import { MessageContent } from 'src/package/message/domain/models/message-content'
import { MessageID } from 'src/package/message/domain/models/message-id'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Email } from 'src/package/shared/domain/models/email'

export interface Message {
	id: MessageID,
	timestamp: number
	passengerName: PassengerName
	passengerEmail: Email
	content: MessageContent
}
