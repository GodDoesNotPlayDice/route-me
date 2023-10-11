import { z } from 'zod'

export const MessageIDSchema = z.object( {
  value : z.string()
} )

type MessageIDType = z.infer<typeof MessageIDSchema>
export interface MessageID extends MessageIDType {}

export interface MessageIDProps {
  value : string
}

export const newMessageID = (props : MessageIDProps): MessageID => {
  return MessageIDSchema.parse( {
    value : props.value
  } )
}
