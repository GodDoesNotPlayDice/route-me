import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { PassengerRepository } from 'src/package/passenger/domain/repository/passenger-repository'
import { ulid } from 'ulidx'

export class PassengerDataMemory implements PassengerRepository {
	constructor( private context: Passenger[] ) {}

	public registerPassenger( passenger: Omit<Passenger, 'id' | 'preferences' | 'description'> ): Promise<Result<boolean, string>> {
		try {
			this.context.push( {
				id         : newPassengerID( {
					value: ulid()
				} ),
				userID     : passenger.userID,
				description: newPassengerDescription( {
					value: ''
				} ),
				preferences: [],
				gender     : passenger.gender,
				birthDay   : passenger.birthDay,
				country    : passenger.country,
				phone      : passenger.phone,
				lastName   : passenger.lastName,
				name       : passenger.name
			} )
			return Promise.resolve( Ok( true ) )
		}
		catch ( e ) {
			return Promise.resolve( Err( 'memory error' ) )
		}
	}
}
