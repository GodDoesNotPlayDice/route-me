import { Result } from 'oxide.ts'
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverID } from 'src/package/driver/domain/models/driver-id'
import { Email } from 'src/package/shared/domain/models/email'

export abstract class DriverDao {
	abstract getByEmail( email: Email ): Promise<Result<Driver, Error[]>>

	abstract create( driver: Driver ): Promise<Result<boolean, Error[]>>

	abstract update( driver: Driver ): Promise<Result<boolean, Error[]>>

	protected driverChange = new BehaviorSubject<Driver | null>( null )

	abstract listen( id: DriverID ): Promise<Result<Observable<Driver | null>, Error[]>>

	abstract close(id: DriverID): Promise<Result<boolean, Error[]>>
}
