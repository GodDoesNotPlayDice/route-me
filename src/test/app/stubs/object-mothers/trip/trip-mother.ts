import { Err,
	Ok, Result } from "oxide.ts";
import { Trip } from 'src/package/trip/domain/models/trip'
import { TripDescriptionMother } from 'src/test/app/stubs/object-mothers/trip/trip-description-mother'
import { TripIdMother } from 'src/test/app/stubs/object-mothers/trip/trip-id-mother'

export class TripMother{
	static random() : Result<Trip, Error[]>{
		return Ok({
			id: TripIdMother.random().unwrap(),
			description: TripDescriptionMother.random().unwrap()
		})
	}

	static invalid() : Result<Trip, Error[]>{
		return Err( [
			TripIdMother.invalid().unwrapErr()
		] )
	}
}
