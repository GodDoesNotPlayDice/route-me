import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { DriverCar } from 'src/package/driver-car/domain/models/driver-car'
import { DriverCarIDMother } from 'src/test/app/stubs/object-mothers/driver-car/driver-car-id-mother'
import { DriverCarModelMother } from 'src/test/app/stubs/object-mothers/driver-car/driver-car-model-mother'
import { DriverCarSeatMother } from 'src/test/app/stubs/object-mothers/driver-car/driver-car-seat-mother'

export class DriverCarMother {
	static random(): Result<DriverCar, Error[]> {
		return Ok( {
			id   : DriverCarIDMother.random()
			                        .unwrap(),
			model: DriverCarModelMother.random()
			                           .unwrap(),
			seat : DriverCarSeatMother.random()
			                          .unwrap()
		} )
	}

	static invalid(): Result<DriverCar, Error[]> {
		return Err( [
			DriverCarIDMother.invalid()
			                 .unwrapErr(),
			DriverCarModelMother.invalid()
			                    .unwrapErr(),
			DriverCarSeatMother.invalid()
			                   .unwrapErr()
		] )
	}
}
