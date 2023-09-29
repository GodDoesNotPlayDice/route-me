import {
  MessageContent,
  MessageID,
  newMessageContent,
  newMessageID
} from '.'

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
