import { Result } from 'oxide.ts'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'

export abstract class ChatDao {

	protected messagesSubject = new BehaviorSubject<Message | null>( null )

	abstract listen( id: ChatID ): Promise<Result<Observable<Message | null>, Error[]>>

	abstract close( id: ChatID ): Promise<Result<boolean, Error[]>>

	abstract sendMessage( id: ChatID,
		message: Message ): Promise<Result<boolean, Error[]>>

	abstract create( chat: Chat ): Promise<Result<boolean, Error[]>>

	abstract getById( id: ChatID ): Promise<Result<Chat, Error[]>>
}
