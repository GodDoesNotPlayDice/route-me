import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	IP,
	newIp
} from 'src/package/ip-api/domain/models/ip'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create ip instance from json
 * @throws {IpInvalidException} - if ip is invalid
 */
export const ipFromJson = ( json: Record<string, any> ): Result<IP, Error> => {
	const langArray: string[] = json['languages'].split( ',' )

	const ip = newIp( {
		languages           : langArray,
		currency            : json['currency'],
		country_calling_code: json['country_calling_code'],
		country_code        : json['country_code'],
		country_name        : json['country_name']
	} )

	if ( ip.isErr() ) {
		return Err( ip.unwrapErr() )
	}

	return Ok( ip.unwrap() )
}

/**
 * Create a json from ip instance
 * @throws {UnknownException} - if unknown error
 */
export const ipToJson = ( ip: IP ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			country_name        : ip.country_name,
			country_code        : ip.country_code,
			country_calling_code: ip.country_calling_code,
			currency            : ip.currency,
			languages           : ip.languages
		}

		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error ip to json' )
		return Err( err )
	}
}
