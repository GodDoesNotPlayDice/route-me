import { Result } from 'oxide.ts'
import {
	MessageID,
	newMessageID
} from 'src/package/message/domain/models/message-id'
import { ulid } from 'ulidx'

export class MessageIDMother {
	static random(): Result<MessageID, Error> {
		return newMessageID( {
			value: ulid()
		} )
	}

	static invalid(): Result<MessageID, Error> {
		return newMessageID( {
			value: ''
		} )
	}
}
