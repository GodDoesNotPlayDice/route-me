import {
  ChatID,
  MessageContent,
  MessageID
} from 'src/package/chat/domain/value-objects'
import { UserID } from 'src/package/user/domain'

export class Message {
  private constructor(
    readonly id: MessageID,
    readonly userID: UserID,
    readonly chatID: ChatID,
    readonly content: MessageContent,
  ) {}

  static from(
    id: MessageID,
    userID: UserID,
    chatID: ChatID,
    content: MessageContent
  ): Message {
    return new Message(
      id,
      userID,
      chatID,
      content
    )
  }
}
