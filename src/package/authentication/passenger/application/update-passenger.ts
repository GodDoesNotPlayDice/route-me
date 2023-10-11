import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import { Passenger } from 'src/package/passenger/domain/models/passenger'

export const updatePassenger = async ( repository: AuthPassengerRepository, passenger : Passenger ): Promise<Result<boolean, string>> => {
	try {
		const result   = await repository.update(passenger)
		const response = result.unwrap()
		return Promise.resolve( Ok( response ) )
	}
	catch ( e ) {
		return Promise.resolve( Err( 'register error' ) )
	}
}
