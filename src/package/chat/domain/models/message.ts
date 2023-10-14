import { MessageContent } from 'src/package/chat/domain/models/message-content'
import { MessageID } from 'src/package/chat/domain/models/message-id'

export interface Message {
  id: MessageID,
  content: MessageContent
}
