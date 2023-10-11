import { Result } from 'oxide.ts'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export abstract class TripDao {
  abstract create(trip: Trip): Promise<Result<boolean, string>>
  abstract getById(id : TripID): Promise<Result<Trip, string>>
  abstract getAllByState(state : TripState): Promise<Result<Trip[], string>>
  abstract getAll(): Promise<Result<Trip[], string>>
  abstract delete(id : TripID): Promise<Result<boolean, string>>
  abstract update(trip: Trip): Promise<Result<boolean, string>>
}
