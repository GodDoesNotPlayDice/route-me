import { CategoryID } from 'src/package/category'
import { ChatID } from 'src/package/chat'
import { DriverID } from 'src/package/driver'
import { PassengerID } from 'src/package/passenger'
import {
  CreatedAt,
  Location
} from 'src/package/shared'
import { EndTripDate } from 'src/package/trip/domain/value-objects/EndTripDate'
import { TripDescription } from 'src/package/trip/domain/value-objects/TripDescription'
import { TripID } from 'src/package/trip/domain/value-objects/TripID'
import { TripName } from 'src/package/trip/domain/value-objects/TripName'
import { TripPrice } from 'src/package/trip/domain/value-objects/TripPrice'
import { TripSeat } from 'src/package/trip/domain/value-objects/TripSeat'
import { TripState } from 'src/package/trip/domain/value-objects/TripState'

export class Trip {
  private constructor(
    readonly id : TripID,
    readonly driverID : DriverID,
    readonly passengers : PassengerID[],
    readonly category : CategoryID,
    readonly chat : ChatID,
    readonly name : TripName,
    readonly description : TripDescription,
    readonly state : TripState,
    readonly price : TripPrice,
    readonly seat : TripSeat,
    readonly startLocation : Location,
    readonly endLocation : Location,
    readonly startDate : CreatedAt,
    readonly endDate : EndTripDate,
  ) {}

  static from(
    id : TripID,
    driverID : DriverID,
    passengers : PassengerID[],
    category : CategoryID,
    chat : ChatID,
    name : TripName,
    description : TripDescription,
    state : TripState,
    price : TripPrice,
    seat : TripSeat,
    startLocation : Location,
    endLocation : Location,
    startDate : CreatedAt,
    endDate : EndTripDate
  ): Trip {
    return new Trip(
      id,
      driverID,
      passengers,
      category,
      chat,
      name,
      description,
      state,
      price,
      seat,
      startLocation,
      endLocation,
      startDate,
      endDate
    )
  }
}
