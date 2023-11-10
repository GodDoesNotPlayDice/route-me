import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import {
	chatFromJson,
	chatToJson
} from 'src/package/chat/application/chat-mapper'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatNotFoundException } from 'src/package/chat/domain/exceptions/chat-not-found-exception'
import { Chat } from 'src/package/chat/domain/models/chat'
import {
	messageFromJson,
	messageToJson
} from 'src/package/message/application/message-mapper'
import { Message } from 'src/package/message/domain/models/message'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { ChatID } from '../domain/models/chat-id'

export class ChatDaoFirebase extends ChatDao {

	constructor( private firebase: AngularFireDatabase ) {
		super()
		this.messagesSubject = new BehaviorSubject<Message | null>( null )
	}

	collectionKey = 'chats'

	async getById( id: ChatID ): Promise<Result<Chat, Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new ChatNotFoundException() ] )
			                 }

			                 const snapshotValue = Object.values(
				                 snapshot.val() )[0] as Record<string, any>

			                 const chat = chatFromJson( snapshotValue )

			                 if ( chat.isErr() ) {
				                 return Err( chat.unwrapErr() )
			                 }

			                 return Ok( chat.unwrap() )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )
	}

	async close( id: ChatID ): Promise<Result<boolean, Error[]>> {
		this.messagesSubject.unsubscribe()
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}
		this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }/messages` )
		    .off()
		return Ok( true )
	}

	async listen( id: ChatID ): Promise<Result<Observable<Message | null>, Error[]>> {
		try {
			const keySaved = await this.getKey( id )

			if ( keySaved.isErr() ) {
				return Err( [ keySaved.unwrapErr() ] )
			}

			const ref = this.firebase.database.ref(
				`${ this.collectionKey }/${ keySaved.unwrap() }/messages` )

			ref.on( 'child_added', ( snapshot ) => {
				const value   = snapshot.val()
				const message = messageFromJson( value )
				if ( message.isOk() ) {
					this.messagesSubject.next( message.unwrap() )
				}
			} )

			return Ok( this.messagesSubject.asObservable() )
		}
		catch ( e ) {
			return Err( [ new FirebaseOperationException() ] )
		}
	}

	async sendMessage( id: ChatID,
		message: Message ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}

		const json = messageToJson( message )

		if ( json.isErr() ) {
			return Err( [ json.unwrapErr() ] )
		}

		await this.firebase.database.ref(
			`${ this.collectionKey }/${ keySaved.unwrap() }/messages` )
		          .push( json.unwrap(),
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
				          else {
					          console.log( 'error send msg' )
					          console.log( error )
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( [ new FirebaseOperationException() ] )
		}

		return Ok( true )
	}

	async create( chat: Chat ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json = chatToJson( chat )

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

	/**
	 * Get firebase key by id
	 * @throws {FirebaseKeyNotFoundException} - if key operation failed
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	private async getKey( id: ChatID ): Promise<Result<string, Error>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'id' )
		                 .equalTo( id.value )
		                 .get()
		                 .then(
			                 async ( snapshot ) => {

				                 let key: string | null = null

				                 snapshot.forEach( ( childSnapshot ) => {
					                 key = childSnapshot.key
				                 } )

				                 if ( key === null ) {
					                 console.log( 'for key null' )
					                 return Err( new FirebaseKeyNotFoundException() )
				                 }
				                 return Ok( key )
			                 } )
		                 .catch( ( error ) => {
			                 console.log( 'for key error' )
			                 console.log( error )
			                 return Err( new FirebaseOperationException() )
		                 } )
	}
}
