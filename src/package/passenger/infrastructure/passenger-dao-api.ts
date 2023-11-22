import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import {
	Err,
	Result
} from 'oxide.ts'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { Email } from 'src/package/shared/domain/models/email'
import { ApiOperationException } from 'src/package/shared/infrastructure/exceptions/api-operation-exception'

export class PassengerDaoApi implements PassengerDao {
	constructor( private http: HttpClient ) {}

	private url = environment.apiUrl

	async create( passenger: Passenger ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async delete( email: Email ): Promise<Result<boolean, Error>> {
		return Err( new ApiOperationException() )
	}

	async getAll(): Promise<Result<Passenger[], Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async getByEmail( email: Email ): Promise<Result<Passenger, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}

	async update( user: Passenger ): Promise<Result<boolean, Error[]>> {
		return Err( [ new ApiOperationException() ] )
	}
}
