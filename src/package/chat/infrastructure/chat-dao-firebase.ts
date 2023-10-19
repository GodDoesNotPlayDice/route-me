import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class ChatDaoFirebase implements ChatDao {

  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'chatsv2'

  async create( chat: Chat ): Promise<Result<boolean, Error>> {
    let completed: string | null = null
    await this.firebase.database.ref( this.collectionKey )
              .push(
                {
                  id    : chat.id.value,
                  tripID: chat.tripID.value
                },
                ( error ) => {
                  if ( !error ) {
                    completed = 'completed'
                  }
                }
              )

    if ( completed === null ) {
      return Err( new FirebaseOperationException() )
    }

    return Ok( true )
  }

  async delete( id: ChatID ): Promise<Result<boolean, Error>> {
    return Err( new FirebaseOperationException() )
  }

  async getAll(): Promise<Result<Chat[], Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

  async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
    return Err( [ new FirebaseOperationException() ] )
  }

}
