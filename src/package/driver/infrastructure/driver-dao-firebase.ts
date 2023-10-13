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

  async create( driver: Driver ): Promise<Result<Driver, Error>> {
    return Err(new UnknownException())
  }

  async delete( id: DriverID ): Promise<Result<boolean, Error>> {
    return Err(new UnknownException())
  }

  async getAll(): Promise<Result<Driver[], Error>> {
    return Err(new UnknownException())
  }

  async getById( id: DriverID ): Promise<Result<Driver, Error>> {
    return Err(new UnknownException())
  }

  async update( driver: Driver ): Promise<Result<boolean, Error>> {
    return Err(new UnknownException())
  }

}
