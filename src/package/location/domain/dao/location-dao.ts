import { Result } from 'oxide.ts'
import { TripLocation } from 'src/package/location/domain/models/trip-location'
import { TripLocationID } from 'src/package/location/domain/models/trip-location-id'

export abstract class LocationDao {
  abstract create( location: TripLocation ): Promise<Result<boolean, Error>>

  abstract getById( id: TripLocationID ): Promise<Result<TripLocation, Error[]>>

  abstract getAll(): Promise<Result<TripLocation[], Error[]>>

  abstract delete( id: TripLocationID ): Promise<Result<boolean, Error>>

  abstract update( location: TripLocation ): Promise<Result<boolean, Error>>
}
