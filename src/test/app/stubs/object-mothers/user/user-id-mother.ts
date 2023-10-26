import { Result } from 'oxide.ts'
import {
	newUserID,
	UserID
} from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

export class UserIDMother {
	static random() :Result<UserID, Error>{
		return newUserID({
			value: ulid()
		})
	}

	static invalid() :Result<UserID, Error>{
		return newUserID({
			value: ''
		})
	}
}
