import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class ChatDaoApi implements ChatDao {

	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async getAll(): Promise<Result<Chat[], Error[]>> {
		return Err( [ new ApiOperationException( 'chat get all  api' ) ] )
	}

	async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
		return Err( [ new ApiOperationException( 'chat get by id api' ) ] )
	}

	async create( chat: Chat ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException( 'chat get by id api' ) ] )
	}
}
