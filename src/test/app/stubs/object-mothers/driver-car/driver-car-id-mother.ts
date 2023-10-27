import { Result } from 'oxide.ts'
import {
	DriverCarID,
	newDriverCarID
} from 'src/package/driver-car/domain/models/driver-car-id'
import { ulid } from 'ulidx'

export class DriverCarIDMother {
	static random(): Result<DriverCarID, Error> {
		return newDriverCarID( {
			value: ulid()
		} )
	}

	static invalid(): Result<DriverCarID, Error> {
		return newDriverCarID( {
			value: ''
		} )
	}
}
