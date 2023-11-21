import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'

export interface Chat {
	id: ChatID,
	messages: Message[]
}
