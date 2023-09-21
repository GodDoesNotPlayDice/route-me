import { PassengerID } from 'src/package/passenger/domain/value-objects/PassengerID'
import { UserID } from 'src/package/user/domain'

export class Passenger {
  private constructor(
    readonly id: PassengerID,
    readonly userID: UserID
  )
  {}

  static from(
    id: PassengerID,
    userID: UserID
  ): Passenger {
    return new Passenger(
      id,
      userID
    )
  }
}
