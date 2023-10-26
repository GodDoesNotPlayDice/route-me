import { faker } from '@faker-js/faker'
import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerBirthDayMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-birth-day-mother'
import { PassengerCountryMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-country-mother'
import { PassengerDescriptionMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-description-mother'
import { PassengerIDMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-id-mother'
import { PassengerLastNameMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-last-name-mother'
import { PassengerNameMother } from 'src/test/app/stubs/object-mothers/passenger/passenger-name-mother'
import { PreferenceMother } from 'src/test/app/stubs/object-mothers/preference/preference-mother'
import { EmailMother } from 'src/test/app/stubs/object-mothers/shared/email-mother'
import { GenderMother } from 'src/test/app/stubs/object-mothers/shared/gender-mother'
import { ImageUrlMother } from 'src/test/app/stubs/object-mothers/shared/image-url-mother'
import { PhoneMother } from 'src/test/app/stubs/object-mothers/shared/phone-mother'
import { ValidNumberMother } from 'src/test/app/stubs/object-mothers/shared/valid-number-mother'

export class PassengerMother {
	static random() :Result<Passenger, Error>{
		const preferences = faker.helpers.multiple(() => PreferenceMother.random().unwrap())
		return Ok({
			id: PassengerIDMother.random().unwrap(),
			country: PassengerCountryMother.random().unwrap(),
			birthDay: PassengerBirthDayMother.random().unwrap(),
			email: EmailMother.random().unwrap(),
			gender: GenderMother.random().unwrap(),
			image: ImageUrlMother.random().unwrap(),
			description: PassengerDescriptionMother.random().unwrap(),
			name: PassengerNameMother.random().unwrap(),
			phone: PhoneMother.random().unwrap(),
			lastName: PassengerLastNameMother.random().unwrap(),
			preferences: preferences,
			averageRating: ValidNumberMother.random(1,5).unwrap()
		})
	}

	static invalid() :Result<Passenger, Error[]>{
		const preferencesErrs = faker.helpers.multiple(() => PreferenceMother.invalid().unwrapErr())
		return Err([
			PassengerIDMother.invalid().unwrapErr(),
			PassengerCountryMother.invalid().unwrapErr(),
			PassengerBirthDayMother.invalid().unwrapErr(),
			EmailMother.invalid().unwrapErr(),
			GenderMother.invalid().unwrapErr(),
			ImageUrlMother.invalid().unwrapErr(),
			PassengerDescriptionMother.invalid().unwrapErr(),
			PassengerNameMother.invalid().unwrapErr(),
			PassengerLastNameMother.invalid().unwrapErr(),
			ValidNumberMother.invalid().unwrapErr(),
			...PhoneMother.invalid().unwrapErr(),
			...preferencesErrs.flat()
		])
	}
}
