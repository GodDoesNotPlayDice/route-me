import { Result } from 'oxide.ts'
import {
	newTripLocationID,
	TripLocationID
} from 'src/package/trip-location/domain/models/trip-location-id'
import { ulid } from 'ulidx'

export class TripLocationIDMother {
	static random(): Result<TripLocationID, Error> {
		return newTripLocationID( {
			value: ulid()
		} )
	}

	static invalid(): Result<TripLocationID, Error> {
		return newTripLocationID( {
			value: ''
		} )
	}
}
