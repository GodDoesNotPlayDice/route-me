import { Result } from 'oxide.ts'
import {
	MessageContent,
	newMessageContent
} from 'src/package/message/domain/models/message-content'
import { FakerParagraphMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-paragraph-mother'

export class MessageContentMother {
	static random(): Result<MessageContent, Error> {
		return newMessageContent( {
			value: FakerParagraphMother.random()
		} )
	}

	static invalid(): Result<MessageContent, Error> {
		return newMessageContent( {
			value: ''
		} )
	}
}
