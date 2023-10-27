import { Result } from 'oxide.ts'
import {
	DriverCarSeat,
	newDriverCarSeat
} from 'src/package/driver-car/domain/models/driver-car-seat'
import { ValidNumberMother } from 'src/test/app/stubs/object-mothers/shared/valid-number-mother'

export class DriverCarSeatMother {
	static random(): Result<DriverCarSeat, Error> {
		return newDriverCarSeat( {
			value: ValidNumberMother.random( 1, 4 )
			                        .unwrap().value
		} )
	}

	static invalid(): Result<DriverCarSeat, Error> {
		return newDriverCarSeat( {
			value: -1
		} )
	}
}
