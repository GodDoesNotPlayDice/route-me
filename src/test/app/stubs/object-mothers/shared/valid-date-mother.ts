import { Result } from 'oxide.ts'
import {
	newValidDate,
	ValidDate
} from 'src/package/shared/domain/models/valid-date'
import { FakerDateMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-date-mother'

export class ValidDateMother {
	static randomNearFuture( options?: {
		days?: number
		refDate?: Date
	} ): Result<ValidDate, Error> {
		return newValidDate( {
			value: FakerDateMother.randomNearFuture( options )
		} )
	}

	static randomBetween( options: {
		from: Date,
		to: Date
	} ): Result<ValidDate, Error> {
		return newValidDate( {
			value: FakerDateMother.randomBetween( options )
		} )
	}

	static randomNearPast( options?: {
		days?: number
		refDate?: Date
	} ): Result<ValidDate, Error> {
		return newValidDate( {
			value: FakerDateMother.randomNearPast( options )
		} )
	}

	static invalid(): Result<ValidDate, Error> {
		return newValidDate( {
			value: new Date( 'invalid' )
		} )
	}
}
