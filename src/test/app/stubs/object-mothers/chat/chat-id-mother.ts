import { Result } from 'oxide.ts'
import {
	ChatID,
	newChatID
} from 'src/package/chat/domain/models/chat-id'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { ulid } from 'ulidx'

export class ChatIDMother {
	static random() :Result<ChatID, Error>{
		return newChatID({
			value: ulid()
		})
	}

	static invalid() :Result<ChatID, Error>{
		return newTripID({
			value: 'invalid'
		})
	}
}