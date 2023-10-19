import { MessageContent } from 'src/package/chat/domain/models/message-content'
import { MessageID } from 'src/package/chat/domain/models/message-id'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserName } from 'src/package/user/domain/models/user-name'

export interface Message {
  id: MessageID,
  userID: UserID
  userName: UserName
  content: MessageContent
}
