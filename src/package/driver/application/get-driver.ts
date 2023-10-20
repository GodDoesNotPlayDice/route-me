import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Email } from 'src/package/shared/domain/models/email'

/**
 * Get Driver
 */
export const getDriver = async ( dao: DriverDao,
	email: Email ): Promise<Result<Driver, Error[]>> => {
	const result = await dao.getByEmail( email )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
