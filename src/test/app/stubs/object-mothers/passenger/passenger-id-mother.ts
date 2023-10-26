import { Result } from "oxide.ts"
import {
	newPassengerID,
	PassengerID
} from 'src/package/passenger/domain/models/passenger-id'
import { ulid } from 'ulidx'

export class PassengerIDMother {
	static random() :Result<PassengerID, Error>{
		return newPassengerID({
			value: ulid()
		})
	}

	static invalid() :Result<PassengerID, Error>{
		return newPassengerID({
			value: ''
		})
	}
}
