import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { chatToJson } from 'src/package/chat/application/chat-mapper'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class ChatDaoApi implements ChatDao{
  private url = environment.apiUrl

  constructor( private http: HttpClient ) {}

  async create( chat: Chat ): Promise<Result<boolean, Error>> {
    try {
      const chatJsonResult = chatToJson( chat )

      if ( chatJsonResult.isErr() ) {
        return Err( chatJsonResult.unwrapErr() )
      }

      const response = await this.http.post( this.url, chatJsonResult.unwrap() ).toPromise()

      console.log( 'response', response)
      return Ok( true )
    }
    catch ( e ) {
      return Err( new ApiOperationException( 'chat create api' ) )
    }
  }

  async delete( id: ChatID ): Promise<Result<boolean, Error>> {
    return Err(new ApiOperationException('chat delete api'))
  }

  async getAll(): Promise<Result<Chat[], Error[]>> {
    return Err([new ApiOperationException('chat get all  api')])
  }

  async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
    return Err([new ApiOperationException('chat get by id api')])
  }

}
