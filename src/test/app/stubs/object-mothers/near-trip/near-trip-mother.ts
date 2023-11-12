import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { NearTrip } from 'src/package/near-trip/domain/models/near-trip'
import { Trip } from 'src/package/trip/domain/models/trip'
import { DriverCarSeatMother } from 'src/test/app/stubs/object-mothers/driver-car/driver-car-seat-mother'
import { PassengerLastNameMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-last-name-mother'
import { PassengerNameMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-name-mother'
import { ImageUrlMother } from 'src/test/app/stubs/object-mothers/shared/image-url-mother'
import { PositionMother } from 'src/test/app/stubs/object-mothers/shared/position-mother'
import { ValidDateMother } from 'src/test/app/stubs/object-mothers/shared/valid-date-mother'
import { TripLocationNameMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-name-mother'
import { TripIDMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'
import { TripPriceMother } from 'src/test/app/stubs/object-mothers/trip/trip-price-mother'

export class NearTripMother {
	static random( randomTrip: Trip ): Result<NearTrip, Error[]> {
		return Ok( {
			id               : randomTrip.id,
			price            : randomTrip.price,
			startDate        : randomTrip.startDate,
			seat             : randomTrip.driver.driverCar.seat,
			longitude        : randomTrip.startLocation.position.lng,
			latitude         : randomTrip.startLocation.position.lat,
			driverLastName   : randomTrip.driver.passenger.lastName,
			driverName       : randomTrip.driver.passenger.name,
			driverImage      : randomTrip.driver.passenger.image,
			endLocationName  : randomTrip.endLocation.name,
			startLocationName: randomTrip.startLocation.name,
			passengersImages : randomTrip.passengers.map(
				passenger => passenger.image )
		} )
	}

	static invalid(): Result<NearTrip, Error[]> {
		const passengersImagesErr = faker.helpers.multiple(
			() => ImageUrlMother.invalid()
			                    .unwrapErr(),
			{
				count: {
					min: 1,
					max: 4
				}
			} )


		return Err( [
			TripIDMother.invalid()
			            .unwrapErr(),
			...TripPriceMother.invalid()
			                  .unwrapErr(),
			ValidDateMother.invalid()
			               .unwrapErr(),
			DriverCarSeatMother.invalid()
			                   .unwrapErr(),
			PositionMother.invalid()
			              .unwrapErr(),
			PassengerLastNameMother.invalid()
			                       .unwrapErr(),
			PassengerNameMother.invalid()
			                   .unwrapErr(),
			ImageUrlMother.invalid()
			              .unwrapErr(),
			TripLocationNameMother.invalid()
			                      .unwrapErr(),
			TripLocationNameMother.invalid()
			                      .unwrapErr(),
			...passengersImagesErr
		] )
	}
}
