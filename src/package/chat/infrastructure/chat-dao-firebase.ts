import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	chatFromJson,
	chatToJson
} from 'src/package/chat/application/chat-mapper'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatIdInvalidException } from 'src/package/chat/domain/exceptions/chat-id-invalid-exception'
import { Chat } from 'src/package/chat/domain/models/chat'
import { ChatID } from 'src/package/chat/domain/models/chat-id'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class ChatDaoFirebase implements ChatDao {

	constructor( private firebase: AngularFireDatabase ) {}

	collectionKey = 'chats'

	async getAll(): Promise<Result<Chat[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[]            = []
			                 const preferences: Chat[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const preference = chatFromJson( value as Record<string, any> )
				                 if ( preference.isErr() ) {
					                 error.push( ...preference.unwrapErr() )
					                 break
				                 }
				                 preferences.push( preference.unwrap() )
			                 }
			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }
			                 return Ok( preferences )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new ChatIdInvalidException() ] )
			                 }

			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 const chat = chatFromJson( snapshotValue )

			                 if ( chat.isErr() ) {
				                 return Err( chat.unwrapErr() )
			                 }

			                 return Ok(chat.unwrap())
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}

	async create( chat: Chat ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json                   = chatToJson( chat)

		if ( json.isErr() ) {
			return Err( json.unwrapErr() )
		}

		await this.firebase.database.ref( this.collectionKey )
		          .push( json.unwrap(),
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( [ new FirebaseOperationException() ] )
		}

		return Ok( true )
	}
}
