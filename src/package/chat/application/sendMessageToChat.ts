import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { newChatID } from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'
import { newMessageContent } from 'src/package/message/domain/models/message-content'
import { newMessageID } from 'src/package/message/domain/models/message-id'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Email } from 'src/package/shared/domain/models/email'
import { ulid } from 'ulidx'

export const sendMessageToChat = async ( dao: ChatDao,  chatID: string,
	message: {
		passengerName: PassengerName,
		passengerEmail: Email,
		content: string,
	}  ): Promise<Result<boolean, Error[]>> => {

	const errors: Error[] = []

	const chatIDResult = newChatID({
		value: chatID
	})

	if ( chatIDResult.isErr() ){
		errors.push( chatIDResult.unwrapErr() )
	}

	const idResult = newMessageID({
		value: ulid()
	})

	if ( idResult.isErr() ){
		errors.push( idResult.unwrapErr() )
	}

	const content = newMessageContent({
		value: message.content
	})

	if ( content.isErr() ){
		errors.push( content.unwrapErr() )
	}

	if ( errors.length > 0 ){
		return Err( errors )
	}

	const newMessage : Message= {
		id: idResult.unwrap(),
		timestamp: Date.now(),
		content: content.unwrap(),
		passengerName: message.passengerName,
		passengerEmail: message.passengerEmail
	}

	const result     = await dao.sendMessage( chatIDResult.unwrap(), newMessage )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
