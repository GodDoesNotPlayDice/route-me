import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newPosition,
	Position
} from 'src/package/position-api/domain/models/position'
import { FakerPositionMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-position-mother'

export class PositionMother {
	static random(): Result<Position, Error> {
		return newPosition( FakerPositionMother.random())
	}

	static nearRandom(center : Position, radius : number): Result<Position, Error> {
		const near = FakerPositionMother.nearRandom( center, radius )
		return newPosition({
			lat: near[0],
			lng: near[1]
		})
	}

	static invalid(): Result<Position, Error> {
		return newPosition( {
			lng: -200,
			lat: -200
		} )
	}
}
