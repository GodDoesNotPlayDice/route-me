import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { locationToJson } from 'src/package/trip-location/application/location-mapper'
import { LocationDao } from 'src/package/trip-location/domain/dao/location-dao'
import { TripLocation } from 'src/package/trip-location/domain/models/trip-location'
import { TripLocationID } from 'src/package/trip-location/domain/models/trip-location-id'

export class LocationDaoFirebase implements LocationDao {

	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'locationsv2'

	async create( location: TripLocation ): Promise<Result<boolean, Error>> {
		let completed: string | null = null

		const result = locationToJson( location )

		if ( result.isErr() ) {
			return Err( result.unwrapErr() )
		}

		await this.firebase.database.ref( this.collectionKey )
		          .push( result.unwrap(),
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

	async delete( id: TripLocationID ): Promise<Result<boolean, Error>> {
		return Err( new FirebaseOperationException )
	}

	async getAll(): Promise<Result<TripLocation[], Error[]>> {
		return Err( [ new FirebaseOperationException ] )
	}

	async getById( id: TripLocationID ): Promise<Result<TripLocation, Error[]>> {
		return Err( [ new FirebaseOperationException ] )
	}

	async update( location: TripLocation ): Promise<Result<boolean, Error>> {
		return Err( new FirebaseOperationException() )
	}

}
