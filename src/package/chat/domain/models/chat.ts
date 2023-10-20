import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/chat/domain/models/message'

export interface Chat {
  id: ChatID,
  //TODO: talvez se necesite trip id
  messages: Message[]
}
