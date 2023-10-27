import { Result } from 'oxide.ts'
import {
	Email,
	newEmail
} from 'src/package/shared/domain/models/email'
import { FakerEmailMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-email-mother'

export class EmailMother {
	static random(): Result<Email, Error> {
		return newEmail( {
			value: FakerEmailMother.random()
		} )
	}

	static invalid(): Result<Email, Error> {
		return newEmail( {
			value: 'invalid'
		} )
	}
}
