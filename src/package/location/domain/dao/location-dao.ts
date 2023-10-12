import { Result } from 'oxide.ts'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'

export abstract class LocationDao {
  abstract create(location: Location): Promise<Result<boolean, string>>
  abstract getById(id : LocationID): Promise<Result<Location, string>>
  abstract getAll(): Promise<Result<Location[], string>>
  abstract delete(id : LocationID): Promise<Result<boolean, string>>
  abstract update(location: Location): Promise<Result<boolean, string>>
}
