import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface TripHistory {
  id: TripHistoryID
  userID: UserID
  tripID: TripID
}
