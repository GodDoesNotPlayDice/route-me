import { Injectable } from '@angular/core'
import { Result } from 'oxide.ts'
import { updatePassengerTrip } from 'src/package/passenger-trip/application/update-passenger-trip'
import { PassengerTripDao } from 'src/package/passenger-trip/domain/dao/passenger-trip-dao'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { Email } from 'src/package/shared/domain/models/email'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

@Injectable( {
	providedIn: 'root'
} )
export class PassengerTripService {

	constructor( private passengerTripDao: PassengerTripDao ) { }

	create( passengerTrip: PassengerTrip ): Promise<Result<boolean, Error[]>> {
		return this.passengerTripDao.create( passengerTrip )
	}

	update( passengerTrip: PassengerTrip,
		state: TripState ): Promise<Result<boolean, Error[]>> {
		return updatePassengerTrip( this.passengerTripDao, passengerTrip, state )
	}

	async deleteAll( email: Email,
		state: TripState ): Promise<Result<boolean, Error[]>> {
		return this.passengerTripDao.deleteAll( email, state )
	}

	delete( id: TripID, email: Email ): Promise<Result<boolean, Error>> {
		return this.passengerTripDao.delete( id, email )
	}

	getAllByEmail( email: Email ): Promise<Result<PassengerTrip[], Error[]>> {
		return this.passengerTripDao.getAllByEmail( email )
	}

	async getByEmailAndID( id: TripID,
		email: Email ): Promise<Result<PassengerTrip, Error[]>> {
		return this.passengerTripDao.getByEmailAndID( id, email )
	}

	async getByID( id: TripID ): Promise<Result<PassengerTrip[], Error[]>> {
		return this.passengerTripDao.getByID( id )
	}
}
