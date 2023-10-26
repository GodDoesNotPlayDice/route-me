import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Message } from 'src/package/message/domain/models/message'
import { MessageContentMother } from 'src/test/app/stubs/object-mothers/message/message-content-mother'
import { MessageIDMother } from 'src/test/app/stubs/object-mothers/message/message-id-mother'
import { PassengerNameMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-name-mother'
import { EmailMother } from 'src/test/app/stubs/object-mothers/shared/email-mother'

export class MessageMother {
	static random() :Result<Message, Error>{
		return Ok({
			id: MessageIDMother.random().unwrap(),
			passengerName: PassengerNameMother.random().unwrap(),
			passengerEmail: EmailMother.random().unwrap(),
			content: MessageContentMother.random().unwrap(),
		})
	}

	static invalid() :Result<Message, Error[]>{
		return Err([
			MessageIDMother.invalid().unwrapErr(),
			PassengerNameMother.invalid().unwrapErr(),
			EmailMother.invalid().unwrapErr(),
			MessageContentMother.invalid().unwrapErr(),
		])
	}
}
