import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	ratingFromJson,
	ratingToJson
} from 'src/package/rating/application/rating-mapper'
import { RatingDao } from 'src/package/rating/domain/dao/rating-dao'
import { RatingIdInvalidException } from 'src/package/rating/domain/exceptions/rating-id-invalid-exception'
import { Rating } from 'src/package/rating/domain/models/rating'
import { RatingID } from 'src/package/rating/domain/models/rating-id'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class RatingDaoFirebase implements RatingDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'ratings'

	async delete( id: RatingID ): Promise<Result<boolean, Error[]>> {
		const keySaved = await this.getKey( id )

		if ( keySaved.isErr() ) {
			return Err( [ keySaved.unwrapErr() ] )
		}

		let completed: string | null = null

		await this.firebase.database.ref( this.collectionKey )
		          .child( keySaved.unwrap() )
		          .remove(
			          ( error ) => {
				          if ( !error ) {
					          completed = 'completed'
				          }
			          }
		          )

		if ( completed === null ) {
			return Err( [ new FirebaseOperationException( 'delete' ) ] )
		}

		return Ok( true )
	}

	async create( rating: Rating ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null
		const json                   = ratingToJson( rating )

		if ( json.isErr() ) {
			return Err( [ json.unwrapErr() ] )
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

	async getByEmail( email: Email ): Promise<Result<Rating[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'email' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new RatingIdInvalidException() ] )
			                 }

			                 const error: Error[]    = []
			                 const ratings: Rating[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {

				                 const rating = ratingFromJson(
					                 value as Record<string, any> )

				                 if ( rating.isErr() ) {
					                 error.push( ...rating.unwrapErr() )
					                 break
				                 }

				                 ratings.push( rating.unwrap() )
			                 }

			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }

			                 return Ok( ratings )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}

	private async getKey( id: RatingID ): Promise<Result<string, Error>> {
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
					                 return Err( new FirebaseKeyNotFoundException() )
				                 }
				                 return Ok( key )
			                 } )
		                 .catch( ( error ) => {
			                 return Err( new FirebaseOperationException() )
		                 } )
	}
}
