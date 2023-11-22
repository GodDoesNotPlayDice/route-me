import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { MessageIdInvalidException } from 'src/package/message/domain/exceptions/message-id-invalid-exception'
import { z } from 'zod'

export const MessageIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type MessageIDType = z.infer<typeof MessageIDSchema>

export interface MessageID extends MessageIDType {}

export interface MessageIDProps {
	value: string
}

/**
 * Create message id instance
 * @throws {MessageIdInvalidException} - if id is invalid
 */
export const newMessageID = ( props: MessageIDProps ): Result<MessageID, Error> => {
	const result = MessageIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new MessageIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
