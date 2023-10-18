import { MessageContent } from 'src/package/chat/domain/models/message-content'
import { MessageID } from 'src/package/chat/domain/models/message-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Message {
  id: MessageID,
  userID : UserID
  userName : UserName
  content: MessageContent
}
