import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	reportFromJson,
	reportToJson
} from 'src/package/report/application/report-mapper'

import { ReportDao } from 'src/package/report/domain/dao/report-dao'
import { ReportIdInvalidException } from 'src/package/report/domain/exceptions/report-id-invalid-exception'
import { Report } from 'src/package/report/domain/models/report'
import { ReportID } from 'src/package/report/domain/models/report-id'
import { Email } from 'src/package/shared/domain/models/email'
import { FirebaseKeyNotFoundException } from 'src/package/shared/infrastructure/exceptions/firebase-key-not-found-exception'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'

export class ReportDaoFirebase implements ReportDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'reports'

	async delete( id: ReportID ): Promise<Result<boolean, Error[]>> {
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

	async create( report: Report ): Promise<Result<boolean, Error[]>> {
		let completed: string | null = null
		const json                   = reportToJson( report )

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

	async getByFromEmail( email: Email ): Promise<Result<Report[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'from_user' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new ReportIdInvalidException() ] )
			                 }

			                 const error: Error[]    = []
			                 const reports: Report[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {

				                 const report = reportFromJson(
					                 value as Record<string, any> )

				                 if ( report.isErr() ) {
					                 error.push( ...report.unwrapErr() )
					                 break
				                 }

				                 reports.push( report.unwrap() )
			                 }

			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }

			                 return Ok( reports )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}

	async getByToEmail( email: Email ): Promise<Result<Report[], Error[]>> {
		return await this.firebase.database.ref( this.collectionKey )
		                 .orderByChild( 'to_user' )
		                 .equalTo( email.value )
		                 .get()
		                 .then( async ( snapshot ) => {
			                 if ( snapshot.val() === null ) {
				                 return Err( [ new ReportIdInvalidException() ] )
			                 }

			                 const error: Error[]    = []
			                 const reports: Report[] = []
			                 for ( let value of Object.values( snapshot.val() ) ) {

				                 const report = reportFromJson(
					                 value as Record<string, any> )

				                 if ( report.isErr() ) {
					                 error.push( ...report.unwrapErr() )
					                 break
				                 }

				                 reports.push( report.unwrap() )
			                 }

			                 if ( error.length > 0 ) {
				                 return Err( error )
			                 }

			                 return Ok( reports )
		                 } )
		                 .catch( ( error ) => {
			                 return Err( [ new FirebaseOperationException() ] )
		                 } )

	}


	private async getKey( id: ReportID ): Promise<Result<string, Error>> {
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
