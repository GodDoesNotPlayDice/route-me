import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverCarID } from 'src/package/driver-car/domain/models/driver-car-id'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class DriverCarDaoApi implements DriverCarDao {

	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async create( driver: DriverCar ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

	async getAll(): Promise<Result<DriverCar[], Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async getByID( id: DriverCarID ): Promise<Result<DriverCar, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}
}
