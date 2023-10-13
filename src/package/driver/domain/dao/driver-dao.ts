import { Result } from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverID } from 'src/package/driver/domain/models/driver-id'

export abstract class DriverDao {
  abstract getAll(): Promise<Result<Driver[], Error>>
  abstract getById( id: DriverID ): Promise<Result<Driver, Error>>
  abstract create( driver: Driver ): Promise<Result<Driver, Error>>
  abstract delete( id: DriverID ): Promise<Result<boolean, Error>>
  abstract update( driver: Driver ): Promise<Result<boolean, Error>>
}
