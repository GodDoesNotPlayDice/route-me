import { Result } from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'

export abstract class DriverCarDao {
  abstract getAll(): Promise<Result<DriverCar[], Error[]>>

  abstract getById( id: DriverCarID ): Promise<Result<DriverCar, Error[]>>

  abstract create( driver: DriverCar ): Promise<Result<boolean, Error>>

  abstract delete( id: DriverCarID ): Promise<Result<boolean, Error>>

  abstract update( driver: DriverCar ): Promise<Result<boolean, Error>>
}
