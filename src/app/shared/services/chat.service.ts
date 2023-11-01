import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Some
} from 'oxide.ts'
import { createChat } from 'src/package/chat/application/create-chat'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatID } from 'src/package/chat/domain/models/chat-id'

@Injectable( {
	providedIn: 'root'
} )
export class ChatService {

	constructor( private chatDao: ChatDao ) { }

	async createChat(): Promise<Option<ChatID>> {
		const result = await createChat( this.chatDao )
		if ( result.isErr() ) {
			console.log( 'error. create chat service', result.unwrapErr() )
			return None
		}
		return Some( result.unwrap().id )
	}
}
