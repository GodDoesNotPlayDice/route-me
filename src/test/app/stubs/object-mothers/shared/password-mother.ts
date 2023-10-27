import { faker } from '@faker-js/faker'
import { Result } from 'oxide.ts'
import {
	newPassword,
	Password
} from 'src/package/shared/domain/models/password'
import { FakerAlphanumericMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-alphanumeric-mother'
import { FakerNumberTextMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-number-text-mother'
import { FakerSpecialCharacterSymbolMother } from 'src/test/app/stubs/object-mothers/shared/faker/faker-special-character-symbol-mother'

export class PasswordMother {
	static random(): Result<Password, Error[]> {
		const upper    = FakerAlphanumericMother.random( {
			length: 3,
			casing: 'upper'
		} )
		const lower    = FakerAlphanumericMother.random( {
			length: 3,
			casing: 'lower'
		} )
		const charater = FakerSpecialCharacterSymbolMother.random( 3 )
		const numbers  = FakerNumberTextMother.random( 3 )
		const combined = faker.helpers.shuffle(
			[ upper, lower, charater, numbers.toString() ] )
		                      .join( '' )
		return newPassword( {
			value: combined
		} )
	}

	static invalid(): Result<Password, Error[]> {
		return newPassword( {
			value: ''
		} )
	}
}
