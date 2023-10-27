import {
	Err,
	Result
} from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { Email } from 'src/package/shared/domain/models/email'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class DriverCarDaoApi implements DriverCarDao {
	async create( driver: DriverCar ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

	async delete( email: Email ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

	async getAll(): Promise<Result<DriverCar[], Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async getByEmail( email: Email ): Promise<Result<DriverCar, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async update( driver: DriverCar ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

}
