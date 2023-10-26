import {
	Err,
	Ok,
	Result,
	Some
} from 'oxide.ts'
import { Trip } from 'src/package/trip/domain/models/trip'
import { CategoryMother } from 'src/test/app/stubs/object-mothers/category/category-mother'
import { TripDescriptionMother } from 'src/test/app/stubs/object-mothers/trip/trip-description-mother'
import { TripIDMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'
import { TripStateMother } from 'src/test/app/stubs/object-mothers/trip/trip-state-mother'

export class TripMother{
	static random() : Result<Trip, Error[]>{
		return Ok({
			id: TripIDMother.random().unwrap(),
			description: TripDescriptionMother.random().unwrap(),
			state: TripStateMother.random().unwrap(),
			category: Some(CategoryMother.random().unwrap())

		})
	}

	static invalid() : Result<Trip, Error[]>{
		return Err( [
			TripIDMother.invalid().unwrapErr()
		] )
	}
}
