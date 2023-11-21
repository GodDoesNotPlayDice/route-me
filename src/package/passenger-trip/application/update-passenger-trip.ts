import { Result } from 'oxide.ts'
import { PassengerTripDao } from 'src/package/passenger-trip/domain/dao/passenger-trip-dao'
import { PassengerTrip } from 'src/package/passenger-trip/domain/models/passenger-trip'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export const updatePassengerTrip = async ( dao: PassengerTripDao,
	passengerTrip: PassengerTrip,
	state: TripState ): Promise<Result<boolean, Error[]>> => {

	const newPassengerTrip: PassengerTrip = {
		tripID   : passengerTrip.tripID,
		userEmail: passengerTrip.userEmail,
		state    : state ?? passengerTrip.state
	}

	return await dao.update( newPassengerTrip )
}
