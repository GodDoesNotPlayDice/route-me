import {
  MessageContent,
  newMessageContent
} from 'src/package/chat/domain/models/message-content'
import {
  MessageID,
  newMessageID
} from 'src/package/chat/domain/models/message-id'

export interface Message {
	id     : MessageID,
	content: MessageContent
}

export interface MessageProps {
	id: string
	content: string
}

export const newMessage = ( props: MessageProps ): Message => {
	return {
    id: newMessageID({
      value: props.id
    }),
    content: newMessageContent({
      value: props.content
    })
  }}
