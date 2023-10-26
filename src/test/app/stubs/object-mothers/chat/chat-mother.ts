import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatIDMother } from 'src/test/app/stubs/object-mothers/chat/chat-id-mother'
import { MessageMother } from 'src/test/app/stubs/object-mothers/message/message-mother'

export class ChatMother {
	static random() :Result<Chat, Error[]>{
		const messagess = faker.helpers.multiple(() => MessageMother.random().unwrap())
		return Ok({
			id: ChatIDMother.random().unwrap(),
			messages: messagess
		})
	}

	static invalid() :Result<Chat, Error[]>{
		const messagess = faker.helpers.multiple(() => MessageMother.invalid().unwrapErr())
		return Err([
			ChatIDMother.invalid().unwrapErr(),
			...messagess.flat()
		])
	}
}
