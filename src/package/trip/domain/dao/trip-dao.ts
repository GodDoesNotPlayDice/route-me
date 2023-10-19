import { Result } from 'oxide.ts'
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripID } from 'src/package/trip/domain/models/trip-id'
import { TripState } from 'src/package/trip/domain/models/trip-state'

export abstract class TripDao {
  abstract create( trip: Trip ): Promise<Result<boolean, Error[]>>

  abstract getById( id: TripID ): Promise<Result<Trip, Error[]>>

  abstract getAllByState( state: TripState ): Promise<Result<Trip[], Error[]>>

  abstract getAll(): Promise<Result<Trip[], Error[]>>

  abstract delete( id: TripID ): Promise<Result<boolean, Error>>

  abstract update( trip: Trip ): Promise<Result<boolean, Error>>
}
