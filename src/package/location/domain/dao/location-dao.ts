

import { Result } from 'oxide.ts'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'

export abstract class LocationDao {
  abstract create( location: Location ): Promise<Result<boolean, Error>>

  abstract getById( id: LocationID ): Promise<Result<Location, Error[]>>

  abstract getAll(): Promise<Result<Location[], Error[]>>

  abstract delete( id: LocationID ): Promise<Result<boolean, Error>>

  abstract update( location: Location ): Promise<Result<boolean, Error>>
}
