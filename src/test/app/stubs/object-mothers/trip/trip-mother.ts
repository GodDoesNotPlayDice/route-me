import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result,
	Some
} from 'oxide.ts'
import { newEndTripDate } from 'src/package/trip/domain/models/end-trip-date'
import { Trip } from 'src/package/trip/domain/models/trip'
import { CategoryMother } from 'src/test/app/stubs/object-mothers/category/category-mother'
import { ChatIDMother } from 'src/test/app/stubs/object-mothers/chat/chat-id-mother'
import { DriverMother } from 'src/test/app/stubs/object-mothers/driver/driver-mother'
import { PassengerMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-mother'
import { ValidDateMother } from 'src/test/app/stubs/object-mothers/shared/valid-date-mother'
import { TripLocationMother } from 'src/test/app/stubs/object-mothers/trip-location/trip-location-mother'
import { TripDescriptionMother } from 'src/test/app/stubs/object-mothers/trip/trip-description-mother'
import { TripIDMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'
import { TripPriceMother } from 'src/test/app/stubs/object-mothers/trip/trip-price-mother'
import { TripStateMother } from 'src/test/app/stubs/object-mothers/trip/trip-state-mother'

export class TripMother{
	static random() : Result<Trip, Error[]>{
		const startDate = ValidDateMother.randomNearFuture({days: 10})
		const endDate = newEndTripDate({
			value: startDate.unwrap().value
		})
		const passengers = faker.helpers.multiple(() => PassengerMother.random().unwrap(),{
			count: {
				min: 1,
				max: 4
			}
		})
		return Ok({
			id: TripIDMother.random().unwrap(),
			description: TripDescriptionMother.random().unwrap(),
			state: TripStateMother.random().unwrap(),
			category: Some(CategoryMother.random().unwrap()),
			chatID: ChatIDMother.random().unwrap(),
			price: TripPriceMother.random().unwrap(),
			endLocation: TripLocationMother.random().unwrap(),
			startLocation: TripLocationMother.random().unwrap(),
			endDate: endDate.unwrap().value,
			startDate: startDate.unwrap().value,
			driver: DriverMother.random().unwrap(),
			passengers: passengers
		})
	}

	static invalid() : Result<Trip, Error[]>{
		const startDate = ValidDateMother.invalid()
		const endDate = newEndTripDate({
			value: new Date('invalid')
		})
		const passengersErrs = faker.helpers.multiple(() => PassengerMother.invalid().unwrapErr(), {
			count: {
				min: 1,
				max: 4
			}
		})
		return Err( [
			TripIDMother.invalid().unwrapErr(),
			TripDescriptionMother.invalid().unwrapErr(),
			TripStateMother.invalid().unwrapErr(),
			ChatIDMother.invalid().unwrapErr(),
			endDate.unwrapErr(),
			startDate.unwrapErr(),
			...passengersErrs.flat(),
			...CategoryMother.invalid().unwrapErr(),
			...TripPriceMother.invalid().unwrapErr(),
			...TripLocationMother.invalid().unwrapErr(),
			...TripLocationMother.invalid().unwrapErr(),
			...DriverMother.invalid().unwrapErr(),
		] )
	}
}
