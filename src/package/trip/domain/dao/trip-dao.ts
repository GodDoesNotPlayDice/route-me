import { Result } from 'oxide.ts'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'
import { Trip } from 'src/package/trip/domain/models/trip'

export abstract class TripDao {
  abstract create( trip: Trip ): Promise<Result<boolean, Error>>

  abstract getById( id: TripID ): Promise<Result<Trip, Error[]>>

  abstract getAllByState( state: TripState ): Promise<Result<Trip[], Error[]>>

  abstract getAll(): Promise<Result<Trip[], Error[]>>

  abstract delete( id: TripID ): Promise<Result<boolean, Error>>

  abstract update( trip: Trip ): Promise<Result<boolean, Error>>
}
