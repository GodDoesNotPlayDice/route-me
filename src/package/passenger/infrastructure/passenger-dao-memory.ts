import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { newPassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { newPassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { UserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'
import { undefined } from 'zod'

export class PassengerDaoMemory implements PassengerDao {
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

  public updatePassenger( props: Partial<Passenger> ): Promise<Result<boolean, string>> {
    return Promise.resolve( Ok( true ) )
  }

  public loginPassenger( userID: UserID ): Promise<Result<Passenger, string>> {
    return Promise.resolve( Err('u') )
  }
}
