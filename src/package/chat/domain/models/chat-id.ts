import { z } from 'zod'

export const ChatIDSchema = z.object( {
  value : z.string()
} )

export type ChatID = z.infer<typeof ChatIDSchema>

interface ChatIDProps {
  value : string
}

export const newChatID = (props : ChatIDProps): ChatID => {
  return ChatIDSchema.parse( {
    value : props.value
  } )
}
