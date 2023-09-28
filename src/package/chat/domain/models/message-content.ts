import { z } from 'zod'

export const MessageContentSchema = z.object( {
  value : z.string()
} )

export type MessageContent = z.infer<typeof MessageContentSchema>

interface MessageContentProps {
  value : string
}

export const newMessageContent = (props : MessageContentProps): MessageContent => {
  return MessageContentSchema.parse( {
    value : props.value
  } )
}
