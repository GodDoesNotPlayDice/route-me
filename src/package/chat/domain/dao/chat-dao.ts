import { Result } from 'oxide.ts'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'

export abstract class ChatDao {
	abstract getById( id: ChatID ): Promise<Result<Chat, Error[]>>

	abstract getAll(): Promise<Result<Chat[], Error[]>>

	abstract create( chat: Chat ): Promise<Result<boolean, Error[]>>
}
