import { Result } from 'oxide.ts'
import {
	DriverCarModel,
	newDriverCarModel
} from 'src/package/driver-car/domain/models/driver-car-model'
import { FakerVehicleModelMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-vehicle-model-mother'

export class DriverCarModelMother {
	static random(): Result<DriverCarModel, Error> {
		return newDriverCarModel( {
			value: FakerVehicleModelMother.random()
		} )
	}

	static invalid(): Result<DriverCarModel, Error> {
		return newDriverCarModel( {
			value: ''
		} )
	}
}
