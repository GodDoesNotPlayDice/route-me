import { TripHistoryID } from 'src/package/trip-history/domain/value-objects/TripHistoryID'
import { TripID } from 'src/package/trip/domain/value-objects/TripID'
import { UserID } from 'src/package/user/domain'

export class TripHistory {
  private constructor(
    readonly id: TripHistoryID,
    readonly userID : UserID,
    readonly tripID : TripID
  ) {}

  static from(
    id: TripHistoryID,
    userID : UserID,
    tripID : TripID
  ): TripHistory {
    return new TripHistory(
      id,
      userID,
      tripID
    )
  }
}
