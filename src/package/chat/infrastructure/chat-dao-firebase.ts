import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class ChatDaoFirebase implements ChatDao {

  constructor( private firebase: AngularFireDatabase ) {}

  collectionKey = 'chatsv2'

  async getAll(): Promise<Result<Chat[], Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

}
