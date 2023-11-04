import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Observable } from 'rxjs'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import {
	newChatID
} from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'

export const listenChat = async ( dao: ChatDao,  chatId: string ): Promise<Result<Observable<Message | null>, Error[]>> => {

	const id = newChatID({
		value: chatId
	})

	if ( id.isErr() ){
		return Err( [ id.unwrapErr() ] )
	}

	const result     = await dao.listen(id.unwrap())

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
