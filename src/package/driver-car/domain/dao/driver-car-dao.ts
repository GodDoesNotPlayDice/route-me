import { Result } from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class DriverCarDao {
	abstract getAll(): Promise<Result<DriverCar[], Error[]>>

	abstract create( driver: DriverCar ): Promise<Result<boolean, Error>>
}
