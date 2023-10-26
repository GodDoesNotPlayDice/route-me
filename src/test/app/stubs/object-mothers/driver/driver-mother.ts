import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import { DriverCarMother } from 'src/test/app/stubs/object-mothers/driver-car/driver-car-mother'
import { DriverDocumentMother } from 'src/test/app/stubs/object-mothers/driver-document/driver-document-mother'
import { DriverIDMother } from 'src/test/app/stubs/object-mothers/driver/driver-id-mother'
import { PassengerMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-mother'

export class DriverMother{
	static random() :Result<Driver, Error[]>{
		const documents = faker.helpers.multiple(() => DriverDocumentMother.random().unwrap())
		return Ok({
			id: DriverIDMother.random().unwrap(),
			car: DriverCarMother.random().unwrap(),
			passenger: PassengerMother.random().unwrap(),
			documents: documents
		})
	}

	static invalid() :Result<Driver, Error[]>{
		const documentsErrs = faker.helpers.multiple(() => DriverDocumentMother.invalid().unwrapErr())
		return Err([
			DriverIDMother.invalid().unwrapErr(),
			...DriverCarMother.invalid().unwrapErr(),
			...PassengerMother.invalid().unwrapErr(),
			...documentsErrs.flat()
		])
	}
}
