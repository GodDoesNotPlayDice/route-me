import { Injectable } from '@angular/core'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'

@Injectable( {
  providedIn: 'root'
} )
export class ChatService {

  constructor( private chatDao: ChatDao ) { }
}
