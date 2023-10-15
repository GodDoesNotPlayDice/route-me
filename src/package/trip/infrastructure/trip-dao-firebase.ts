import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Trip } from 'src/app/shared/models/trip/trip'
import { tripToJSON } from 'src/app/shared/models/trip/trip-mapper'
import { dateToJSON } from 'src/package/shared/config/helper/date/date-mapper'
import { FirebaseOperationException } from 'src/package/shared/infrastructure/exceptions/firebase-operation-exception'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export class TripDaoFirebase implements TripDao {
	constructor( private firebase: AngularFireDatabase ) {
	}

	collectionKey = 'trips'

	async create( trip: Trip ): Promise<Result<boolean, Error>> {
		let completed: string | null = null

		await this.firebase.database.ref( this.collectionKey )
		          .push( {
			          id					 : trip.id.value,
			          driverID				 : trip.driverID.value,
			          chatID				 : trip.chatID.value,
			          passengersID			 : 'none',
			          startDate				 : dateToJSON(trip.startDate),
			          endDate				 : dateToJSON(trip.endDate),
			          startLocation			 : trip.startLocation.value,
			          endLocation			 : trip.endLocation.value,
			          categoryID			 : 'none',
			          description			 : '',
			          price					 : 'none',
			          seat					 : 'none',
			          state					 : 'Open',
			          },
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

	async delete( id: TripID ): Promise<Result<boolean, Error>> {
		return Err( new FirebaseOperationException )
	}

	async getAll(): Promise<Result<Trip[], Error[]>> {
		return Err( [ new FirebaseOperationException ] )
	}

	async getAllByState( state: TripState ): Promise<Result<Trip[], Error[]>> {
		return Err( [ new FirebaseOperationException ] )
	}

	async getById( id: TripID ): Promise<Result<Trip, Error[]>> {
		return Err( [ new FirebaseOperationException ] )
	}

	async update( trip: Trip ): Promise<Result<boolean, Error>> {
		return Err( new FirebaseOperationException() )
	}

}
