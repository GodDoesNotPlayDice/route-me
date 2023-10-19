import { AngularFireDatabase } from '@angular/fire/compat/database'
import {
  Err,
  Result
} from 'oxide.ts'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

export class DriverDaoFirebase implements DriverDao {
  constructor( private firebase: AngularFireDatabase ) {
  }

  collectionKey = 'driverv2'

  /**
   * Create a driver
   * @throws {UnknownException} - if unknown error
   */
  async create( driver: Driver ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Delete a driver
   * @throws {UnknownException} - if unknown error
   */
  async delete( id: DriverID ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

  /**
   * Get all drivers
   * @throws {UnknownException} - if unknown error
   */
  async getAll(): Promise<Result<Driver[], Error[]>> {
    return Err( [ new UnknownException() ] )
  }

  /**
   * Get a driver by id
   * @throws {UnknownException} - if unknown error
   */
  async getById( id: DriverID ): Promise<Result<Driver, Error[]>> {
    return Err( [ new UnknownException() ] )
  }

  /**
   * Update a driver
   * @throws {UnknownException} - if unknown error
   */
  async update( driver: Driver ): Promise<Result<boolean, Error>> {
    return Err( new UnknownException() )
  }

}
