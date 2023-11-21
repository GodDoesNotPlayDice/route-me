import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { Observable } from 'rxjs'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class ChatDaoApi extends ChatDao {

	constructor( private http: HttpClient ) {
		super()
	}

	private url = environment.apiUrl

	async create( chat: Chat ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException( 'chat create api' ) ] )
	}

	async listen( id: ChatID ): Promise<Result<Observable<Message | null>, Error[]>> {
		return Err( [ new ApiOperationException( 'chat listen api' ) ] )
	}

	async sendMessage( id: ChatID,
		message: Message ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException( 'chat send message api' ) ] )
	}

	async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
		return Err( [ new ApiOperationException( 'chat get by id api' ) ] )
	}

	async close(): Promise<void> {
	}
}
