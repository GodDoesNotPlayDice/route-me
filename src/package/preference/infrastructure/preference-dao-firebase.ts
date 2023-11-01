import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	preferenceFromJson,
	preferenceToJson
} from 'src/package/preference/application/preference-mapper'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { Preference } from 'src/package/preference/domain/models/preference'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class PreferenceDaoFirebase implements PreferenceDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'preferences'

	/**
	 * Create preference
	 * @throws {FirebaseOperationException} - if operation failed
	 * @throws {UnknownException} - if unknown error
	 */
	async create( preference: Preference ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null

		const json                   = preferenceToJson( preference )

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

	/**
	 * Get all preferences
	 * @throws {FirebaseOperationException} - if operation failed
	 */
	async getAll(): Promise<Result<Preference[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 const error: Error[]            = []
			                 const preferences: Preference[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {
				                 const preference = preferenceFromJson(
					                 value as Record<string, any> )
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
}
