import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { newChatID } from 'src/package/chat/domain/models/chat-id'

export const getChatByID = async ( dao: ChatDao,
	chatID: string ): Promise<Result<Chat, Error[]>> => {

	const id = newChatID( {
		value: chatID
	} )

	if ( id.isErr() ) {
		return Err( [ id.unwrapErr() ] )
	}

	const result = await dao.getById( id.unwrap() )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
