import { TripHistoryID } from 'src/package/trip-history/domain/models/trip-history-id'
import { Trip } from 'src/package/trip/domain/models/trip'

export interface TripHistory {
  id: TripHistoryID
  trips: Trip[]
}
