import {
  Err,
  Result
} from 'oxide.ts'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { Location } from 'src/package/location/domain/models/location'
import { LocationID } from 'src/package/location/domain/models/location-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class LocationDaoApi implements LocationDao {

  /**
   * Create location
   * @throws {UnknownException} - if unknown error
   */
  async create( location: Location ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Delete location
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: LocationID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Get all location
   * @throws {UnknownException} - if unknown error
   */
  async getAll(): Promise<Result<Location[], Error[]>> {
    return Err( [new UnknownException()] )
  }

  /**
   * Get by id location
   * @throws {UnknownException} - if unknown error
   */
  async getById( id: LocationID ): Promise<Result<Location, Error[]>> {
    return Err( [new UnknownException()] )
  }

  /**
   * Update location
   * @throws {UnknownException} - if unknown error
   */
  async update( location: Location ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

}
