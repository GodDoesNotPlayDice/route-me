import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Report } from 'src/package/report/domain/models/report'
import { newReportID } from 'src/package/report/domain/models/report-id'
import { newReportMessage } from 'src/package/report/domain/models/report-message'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newEmail } from 'src/package/shared/domain/models/email'

/**
 * Create a report instance from json
 * @throws {RatingIdInvalidException} - if id is invalid
 * @throws {RatingValueInvalidException} - if value is invalid
 */
export const reportFromJson = ( json: Record<string, any> ): Result<Report, Error[]> => {
	const err: Error[] = []

	const id = newReportID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const fromUser = newEmail( {
		value: json['from_user'] ?? ''
	} )

	if ( fromUser.isErr() ) {
		err.push( fromUser.unwrapErr() )
	}

	const toUser = newEmail( {
		value: json['to_user'] ?? ''
	} )

	if ( toUser.isErr() ) {
		err.push( toUser.unwrapErr() )
	}

	const message = newReportMessage( {
		value: json['message'] ?? ''
	} )

	if ( message.isErr() ) {
		err.push( message.unwrapErr() )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
		id      : id.unwrap(),
		message : message.unwrap(),
		toUser  : toUser.unwrap(),
		fromUser: fromUser.unwrap()
	} )
}

/**
 * Create a json from report instance
 * @throws {UnknownException} - if unknown error
 */
export const reportToJson = ( report: Report ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id       : report.id.value,
			from_user: report.fromUser.value,
			to_user  : report.toUser.value,
			message  : report.message.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error report to json' )
		return Err( err )
	}
}
