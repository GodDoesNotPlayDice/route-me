import { Result } from 'oxide.ts'
import {
	DriverID,
	newDriverID
} from 'src/package/driver/domain/models/driver-id'
import { ulid } from 'ulidx'

export class DriverIDMother {
	static random(): Result<DriverID, Error> {
		return newDriverID( {
			value: ulid()
		} )
	}

	static invalid(): Result<DriverID, Error> {
		return newDriverID( {
			value: ''
		} )
	}
}
