import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { newDriverCarSeat } from 'src/package/driver-car/domain/models/driver-car-seat'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { newPassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { newPassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { newPosition } from 'src/package/position-api/domain/models/position'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'
import {
	ImageUrl,
	newImageUrl
} from 'src/package/shared/domain/models/image-url'
import { newValidDate } from 'src/package/shared/domain/models/valid-date'
import {
	dateFromJSON,
	dateToJSON
} from 'src/package/shared/utils/date/date-mapper'
import { newTripLocationName } from 'src/package/trip-location/domain/models/trip-location-name'
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
			seat               : nearTrip.seat.value,
			driver_name        : nearTrip.driverName.value,
			driver_last_name   : nearTrip.driverLastName.value,
			driver_image       : nearTrip.driverImage.value,
			passengers_images  : nearTrip.passengersImages.map( p => p.value ),
			price              : {
				amount  : nearTrip.price.amount.value,
				currency: nearTrip.price.currency.value
			},
			start_date         : dateToJSON( nearTrip.startDate ),
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
 * @throws {TripLocationIdInvalidException} - if location id is invalid
 * @throws {TripLocationNameInvalidException} - if location name is invalid
 * @throws {TripLocationCountryCodeInvalidException} - if location country code is invalid
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
		value: dateFromJSON( json['start_date'] ) ?? ''
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

	const startLocation = newTripLocationName( {
		value: json['start_location_name'] ?? ''
	} )

	if ( startLocation.isErr() ) {
		err.push( startLocation.unwrapErr() )
	}

	const endLocation = newTripLocationName( {
		value: json['end_location_name'] ?? ''
	} )

	if ( endLocation.isErr() ) {
		err.push( endLocation.unwrapErr() )
	}

	const position = newPosition( {
		lat: json['latitude'],
		lng: json['longitude']
	} )

	if ( position.isErr() ) {
		err.push( position.unwrapErr() )
	}

	const seat = newDriverCarSeat( {
		value: json['seat'] ?? ''
	} )

	if ( seat.isErr() ) {
		err.push( seat.unwrapErr() )
	}

	const driverName = newPassengerName( {
		value: json['driver_name'] ?? ''
	} )

	if ( driverName.isErr() ) {
		err.push( driverName.unwrapErr() )
	}

	const driverLastName = newPassengerLastName( {
		value: json['driver_last_name'] ?? ''
	} )

	if ( driverLastName.isErr() ) {
		err.push( driverLastName.unwrapErr() )
	}

	const driverImage = newImageUrl( {
		value: json['driver_image'] ?? ''
	} )

	if ( driverImage.isErr() ) {
		err.push( driverImage.unwrapErr() )
	}


	const passengerImages: ImageUrl[] = []
	if ( json['passengers_images'] ) {
		for ( const imagePassenger of Object.values( json['passengers_images'] ) ) {
			const imageResult = newImageUrl( {
				value: imagePassenger as string
			} )
			if ( imageResult.isErr() ) {
				err.push( imageResult.unwrapErr() )
			}
			else {
				passengerImages.push( imageResult.unwrap() )
			}
		}
	}

	if ( err.length > 0 ) {
		return Err( err )
	}

	return Ok( {
			id               : id.unwrap(),
			price            : price.unwrap(),
			startDate        : startDate.unwrap().value,
			startLocationName: startLocation.unwrap(),
			endLocationName  : endLocation.unwrap(),
			driverLastName   : driverLastName.unwrap(),
			driverName       : driverName.unwrap(),
			driverImage      : driverImage.unwrap(),
			passengersImages : passengerImages,
			seat             : seat.unwrap(),
			latitude         : position.unwrap().lat,
			longitude        : position.unwrap().lng
		}
	)
}

