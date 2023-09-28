import { z } from 'zod'

export const MessageIDSchema = z.object( {
  value : z.string()
} )

export type MessageID = z.infer<typeof MessageIDSchema>

interface MessageIDProps {
  value : string
}

export const newMessageID = (props : MessageIDProps): MessageID => {
  return MessageIDSchema.parse( {
    value : props.value
  } )
}
