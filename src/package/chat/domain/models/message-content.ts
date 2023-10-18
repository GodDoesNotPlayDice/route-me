import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { MessageContentInvalidException } from 'src/package/chat/domain/exceptions/message-content-invalid-exception'
import { z } from 'zod'

export const MessageContentSchema = z.object( {
  value: z.string().min(1)
} )

type MessageContentType = z.infer<typeof MessageContentSchema>

export interface MessageContent extends MessageContentType {}

export interface MessageContentProps {
  value: string
}

/**
 * Create message content instance
 * @throws {MessageContentInvalidException} - if content is invalid
 */
export const newMessageContent = ( props: MessageContentProps ): Result<MessageContent, Error> => {
  const result = MessageContentSchema.safeParse( {
    value: props.value
  } )

  if ( !result.success ) {
    return Err( new MessageContentInvalidException() )
  }
  else {
    return Ok( result.data )
  }
}
