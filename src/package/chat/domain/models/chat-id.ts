import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { ChatIdInvalidException } from 'src/package/chat/domain/exceptions/chat-id-invalid-exception'
import { z } from 'zod'

export const ChatIDSchema = z.object( {
  value: z.string()
          .min(1)
} )

type ChatIDType = z.infer<typeof ChatIDSchema>

export interface ChatID extends ChatIDType {}

export interface ChatIDProps {
  value: string
}

/**
 * Create chat id instance
 * @throws {ChatIdInvalidException} - if id is invalid
 */
export const newChatID = ( props: ChatIDProps ): Result<ChatID, Error> => {
  const result = ChatIDSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new ChatIdInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
