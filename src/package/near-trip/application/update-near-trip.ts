import {
	Result,
	Some
} from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { ImageUrl } from 'src/package/shared/domain/models/image-url'

export const updateNearTrip = async ( dao: NearTripRepository,
	nearTrip: NearTrip, props: {
		latitude?: number
		longitude?: number,
		driverImage?: ImageUrl
		passengersImages?: ImageUrl[]
	} ): Promise<Result<boolean, Error>> => {
	const newNearTrip: NearTrip = {
		id               : nearTrip.id,
		startLocationName: nearTrip.startLocationName,
		endLocationName  : nearTrip.endLocationName,
		price            : nearTrip.price,
		startDate        : nearTrip.startDate,
		seat             : nearTrip.seat,
		passengersImages : props.passengersImages ? props.passengersImages.map(
			( x ) => Some( x ) ) : nearTrip.passengersImages,
		driverImage      : props.driverImage
			? Some( props.driverImage )
			: nearTrip.driverImage,
		driverName       : nearTrip.driverName,
		driverLastName   : nearTrip.driverLastName,
		longitude        : props.longitude ?? nearTrip.longitude,
		latitude         : props.latitude ?? nearTrip.latitude
	}

	return await dao.update( newNearTrip )
}
