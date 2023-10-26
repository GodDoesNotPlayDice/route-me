import { Result } from 'oxide.ts'
import {
	newTripHistoryID,
	TripHistoryID
} from 'src/package/trip-history/domain/models/trip-history-id'
import { ulid } from 'ulidx'

export class TripHistoryIDMother {
	static random() :Result<TripHistoryID, Error>{
		return newTripHistoryID({
			value: ulid()
		})
	}

	static invalid() :Result<TripHistoryID, Error>{
		return newTripHistoryID({
			value: ''
		})
	}
}
