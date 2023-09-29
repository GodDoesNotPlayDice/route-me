import { z } from 'zod'

export const MessageContentSchema = z.object( {
  value : z.string()
} )

type MessageContentType = z.infer<typeof MessageContentSchema>
export interface MessageContent extends MessageContentType {}

export interface MessageContentProps {
  value : string
}

export const newMessageContent = (props : MessageContentProps): MessageContent => {
  return MessageContentSchema.parse( {
    value : props.value
  } )
}
