import { Injectable } from '@angular/core'
import {
	None,
	Option,
	Result,
	Some
} from 'oxide.ts'
import { Observable } from 'rxjs'
import { createChat } from 'src/package/chat/application/create-chat'
import { getChatByID } from 'src/package/chat/application/getChatByID'
import { listenChat } from 'src/package/chat/application/listenChat'
import { sendMessageToChat } from 'src/package/chat/application/sendMessageToChat'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { Chat } from 'src/package/chat/domain/models/chat'
import {
	ChatID,
	newChatID
} from 'src/package/chat/domain/models/chat-id'
import { Message } from 'src/package/message/domain/models/message'
import { PassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Email } from 'src/package/shared/domain/models/email'

@Injectable( {
	providedIn: 'root'
} )
export class ChatService {

	constructor( private chatDao: ChatDao ) {}

	async createChat(): Promise<Option<ChatID>> {
		const result = await createChat( this.chatDao )
		if ( result.isErr() ) {
			console.log( 'error. create chat service', result.unwrapErr() )
			return None
		}
		return Some( result.unwrap().id )
	}

	async listen( chatID: string ): Promise<Result<Observable<Message | null>, Error[]>> {
		return await listenChat( this.chatDao, chatID )
	}

	async close( id: string ): Promise<boolean> {
		const idResult = newChatID( {
			value: id
		} )

		if ( idResult.isErr() ) {
			return false
		}

		const result = await this.chatDao.close( idResult.unwrap() )
		if ( result.isErr() ) {
			console.log( 'error. close chat service', result.unwrapErr() )
			return false
		}
		return true
	}

	async sendMessage( chatID: string,
		message: {
			passengerName: PassengerName,
			passengerLastName: PassengerLastName,
			passengerEmail: Email,
			content: string,
		} ): Promise<Result<boolean, Error[]>> {
		return await sendMessageToChat( this.chatDao, chatID, message )
	}

	async getById( chatID: string ): Promise<Result<Chat, Error[]>> {
		return await getChatByID( this.chatDao, chatID )
	}
}
