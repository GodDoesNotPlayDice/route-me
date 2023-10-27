import { Result } from 'oxide.ts'
import {
	newTripID,
	TripID
} from 'src/package/trip/domain/models/trip-id'
import { ulid } from 'ulidx'

export class TripIDMother {
	static random(): Result<TripID, Error> {
		return newTripID( {
			value: ulid()
		} )
	}

	static invalid(): Result<TripID, Error> {
		return newTripID( {
			value: ''
		} )
	}
}
