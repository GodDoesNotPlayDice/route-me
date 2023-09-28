import { z } from 'zod'
import {
	MessageContentSchema,
	MessageIDSchema
} from '.'

export const MessageSchema = z.object( {
	id     : MessageIDSchema,
	content: MessageContentSchema
} )

export type Message = z.infer<typeof MessageSchema>

export interface MessageProps {
	id: string
	content: string
}

export const newMessage = ( props: MessageProps ): Message => {
	return MessageSchema.parse( {
		id     : MessageIDSchema.parse( {
			value: props.id
		} ),
		content: MessageContentSchema.parse( {
			value: props.content
		} )
	} )
}
