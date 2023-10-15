import { Injectable } from '@angular/core'
import {
  None,
  Option,
  Some
} from 'oxide.ts'
import { createChat } from 'src/package/chat/application/create-chat'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { TripID } from 'src/package/trip/domain/models/trip-id'

@Injectable( {
  providedIn: 'root'
} )
export class ChatService {

  constructor( private chatDao: ChatDao ) { }

  async createChat( props: { tripID: TripID } ): Promise<Option<ChatID>> {
    const result = await createChat( this.chatDao, props )

    if ( result.isErr() ) {
      return None
    }
    return Some( result.unwrap().id )
  }
}
