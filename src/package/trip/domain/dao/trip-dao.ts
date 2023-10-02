import { Result } from 'oxide.ts'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'

export abstract class TripDao {
  abstract create(trip: Omit<Trip, 'id'>): Promise<Result<boolean, string>>
  abstract getById(id : TripID): Promise<Result<Trip, string>>
  abstract delete(id : TripID): Promise<Result<boolean, string>>
  abstract update(trip: Trip): Promise<Result<boolean, string>>
}
