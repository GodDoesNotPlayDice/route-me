import { Result } from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class DriverDao {
	abstract getByEmail( email: Email ): Promise<Result<Driver, Error[]>>

	abstract create( driver: Driver ): Promise<Result<boolean, Error[]>>

	abstract update( driver: Driver ): Promise<Result<boolean, Error[]>>
}
