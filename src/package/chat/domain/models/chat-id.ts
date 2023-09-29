import { z } from 'zod'

export const ChatIDSchema = z.object( {
  value : z.string()
} )

type ChatIDType = z.infer<typeof ChatIDSchema>
export interface ChatID extends ChatIDType {}

export interface ChatIDProps {
  value : string
}

export const newChatID = (props : ChatIDProps): ChatID => {
  return ChatIDSchema.parse( {
    value : props.value
  } )
}
