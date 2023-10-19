import { Result } from 'oxide.ts'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { Position } from 'src/package/position-api/domain/models/position'
import { TripPrice } from 'src/package/trip/domain/models/trip-price'
import { UserID } from 'src/package/user/domain/models/user-id'

export abstract class TripRepository {
	abstract getTripPrice( start: Position, end: Position, driverID: DriverID,
		userID: UserID ): Promise<Result<TripPrice, Error[]>>
}
