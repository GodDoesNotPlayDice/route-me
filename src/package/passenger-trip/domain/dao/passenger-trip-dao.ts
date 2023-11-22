import { Result } from 'oxide.ts'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { Email } from 'src/package/shared/domain/models/email'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export abstract class PassengerTripDao {
	abstract create( passengerTrip: PassengerTrip ): Promise<Result<boolean, Error[]>>

	abstract update( passengerTrip: PassengerTrip ): Promise<Result<boolean, Error[]>>

	abstract deleteAll( email: Email,
		state: TripState ): Promise<Result<boolean, Error[]>>

	abstract delete( id: TripID, email: Email ): Promise<Result<boolean, Error>>

	abstract getAllByEmail( email: Email ): Promise<Result<PassengerTrip[], Error[]>>

	abstract getByEmailAndID( id: TripID,
		email: Email ): Promise<Result<PassengerTrip, Error[]>>

	abstract getByID( id: TripID ): Promise<Result<PassengerTrip[], Error[]>>
}
