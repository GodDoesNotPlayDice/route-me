import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { PositionInvalidException } from 'src/package/position-api/domain/exceptions/position-invalid-exception'
import {
	dateFromJSON,
	dateToJSON
} from 'src/package/shared/config/helper/date/date-mapper'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import { newLocation } from 'src/package/trip-location/domain/models/trip-location'
import { newTripID } from 'src/package/trip/domain/models/trip-id'
import { newTripPrice } from 'src/package/trip/domain/models/trip-price'

/**
 * Create a json from near trip instance
 * @throws {UnknownException} - if unknown error
 */
export const nearTripToJson = ( nearTrip: NearTrip ): Result<Record<string, any>, Error> => {
	try {
		return Ok( {
			id                 : nearTrip.id.value,
			start_location_name: nearTrip.startLocationName.value,
			end_location_name  : nearTrip.endLocationName.value,
			price              : {
				amount  : nearTrip.price.amount,
				currency: nearTrip.price.currency
			},
			start_date         : dateToJSON( nearTrip.startDate.value ),
			latitude           : nearTrip.latitude,
			longitude          : nearTrip.longitude
		} )
	}
	catch ( e ) {
		return Err( new UnknownException( 'error near trip to json' ) )
	}
}

/**
 * Create a near trip instance from json
 * @throws {TripIdInvalidException} - if trip id is invalid
 * @throws {CategoryNameInvalidException} - if category name is invalid
 * @throws {DateInvalidException} - if date is invalid
 * @throws {LocationIdInvalidException} - if location id is invalid
 * @throws {LocationNameInvalidException} - if location name is invalid
 * @throws {LocationCountryCodeInvalidException} - if location country code is invalid
 * @throws {PositionInvalidException} - if location position is invalid
 */
export const nearTripFromJson = ( json: Record<string, any> ): Result<NearTrip, Error[]> => {
	const err: Error[] = []

	const id = newTripID( {
		value: json['id'] ?? ''
	} )

	if ( id.isErr() ) {
		err.push( id.unwrapErr() )
	}

	const startDate = newValidDate( {
		value: dateFromJSON( json['startDate'] ) ?? ''
	} )

	if ( startDate.isErr() ) {
		err.push( startDate.unwrapErr() )
	}

	const price = newTripPrice( {
		amount  : json['price']?.amount ?? '',
		currency: json['price']?.currency ?? ''
	} )

	if ( price.isErr() ) {
		err.push( ...price.unwrapErr() )
	}

	const startLocation = newLocation( {
		id         : json['start_location']?.id ?? '',
		name       : json['start_location']?.name ?? '',
		countryCode: json['start_location']?.countryCode ?? '',
		position   : {
			lat: json['start_location']?.position?.latitude ?? '',
			lng: json['start_location']?.position?.longitude ?? ''
		}
	} )

	if ( startLocation.isErr() ) {
		err.push( ...startLocation.unwrapErr() )
	}

	const endLocation = newLocation( {
		id         : json['end_location']?.id ?? '',
		name       : json['end_location']?.name ?? '',
		countryCode: json['end_location']?.countryCode ?? '',
		position   : {
			lat: json['end_location']?.position?.latitude ?? '',
			lng: json['end_location']?.position?.longitude ?? ''
		}
	} )

	if ( endLocation.isErr() ) {
		err.push( ...endLocation.unwrapErr() )
	}

	//TODO: revisar si se verifica
	if ( json['latitude'] === undefined || json['longitude'] === undefined ) {
		err.push(
			new PositionInvalidException( 'latitude or longitude is undefined' ) )
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
			id               : id.unwrap(),
			price            : price.unwrap(),
			startDate        : startDate.unwrap(),
			startLocationName: startLocation.unwrap().name,
			endLocationName  : endLocation.unwrap().name,
			latitude         : json['latitude'],
			longitude        : json['longitude']
		}
	)
}

