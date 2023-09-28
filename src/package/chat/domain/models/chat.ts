import { ChatIDSchema } from 'src/package/chat/domain/models/'
import { TripIDSchema } from 'src/package/trip/domain/models'
import { z } from 'zod'

export const ChatSchema = z.object( {
	id    : ChatIDSchema,
	tripID: TripIDSchema
} )

export type Chat = z.infer<typeof ChatSchema>

export interface ChatProps {
	id: string
	tripID: string
}

export const newChat = ( props: ChatProps ): Chat => {
	return ChatSchema.parse( {
		id    : ChatIDSchema.parse( {
			value: props.id
		} ),
		tripID: TripIDSchema.parse( {
			value: props.tripID
		} )
	} )
}
