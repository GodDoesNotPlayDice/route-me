import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { User } from "src/package/user/domain/models/user"
import { EmailMother } from 'src/test/app/stubs/object-mothers/shared/email-mother'
import { UserIDMother } from 'src/test/app/stubs/object-mothers/user/user-id-mother'

export class UserMother {
	static random() :Result<User, Error[]>{
		return Ok({
			id: UserIDMother.random().unwrap(),
			email: EmailMother.random().unwrap()
		})
	}

	static invalid() :Result<User, Error[]>{
		return Err([
			UserIDMother.invalid().unwrapErr(),
			EmailMother.invalid().unwrapErr()
		])
	}
}

