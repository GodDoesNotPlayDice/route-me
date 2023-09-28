import {
	PreferenceID,
	PreferenceIDSchema
} from 'src/package/preference'
import { GenderSchema } from 'src/package/shared/domain/models'
import {
	PassengerBirthDaySchema,
	PassengerCountrySchema,
	PassengerDescriptionSchema,
	PassengerIDSchema,
	PassengerLastNameSchema,
	PassengerNameSchema,
	PassengerPhoneSchema
} from 'src/package/passenger/domain/models'
import {
	newUserID,
	UserID,
	UserIDSchema
} from 'src/package/user'
import { z } from 'zod'

export const PassengerSchema = z.object( {
	id: PassengerIDSchema,
	userID: UserIDSchema,
	name : PassengerNameSchema,
	lastName: PassengerLastNameSchema,
	description: PassengerDescriptionSchema,
	phone: PassengerPhoneSchema,
	birthDay: PassengerBirthDaySchema,
	country: PassengerCountrySchema,
	gender: GenderSchema,
	preferences: z.array( PreferenceIDSchema )
} )

export type Passenger = z.infer<typeof PassengerSchema>

export interface PassengerProps {
	id: string,
	userID: UserID,
	name: string,
	lastName: string,
	description: string,
	phone: string,
	birthDay: Date,
	country: string,
	gender: string,
	preferences: PreferenceID[]
}
export const newPassenger = (props : PassengerProps): Passenger => {
	return PassengerSchema.parse( {
		id: PassengerIDSchema.parse({
			value: props.id
		}),
		userID: UserIDSchema.parse({
			value: props.userID
		}),
		name: PassengerNameSchema.parse({
			value: props.name
		}),
		lastName: PassengerLastNameSchema.parse({
			value: props.lastName
		}),
		description: PassengerDescriptionSchema.parse({
			value: props.description
		}),
		phone: PassengerPhoneSchema.parse({
			value: props.phone
		}),
		birthDay: PassengerBirthDaySchema.parse({
			value: props.birthDay
		}),
		country: PassengerCountrySchema.parse({
			value: props.country
		}),
		gender: GenderSchema.parse({
			value: props.gender
		}),
		preferences: props.preferences
		// preferences: props.preferences.map( ( preference: PreferenceID ) => {
		// 	return PreferenceIDSchema.parse( {
		// 		value: preference.value
		// 	} )
		// })
	} )
}

export const defaultPassengers: Passenger[] = [
	newPassenger( {
		id: 'ab2',
		userID: newUserID({
			value: 'abc'
		}),
		name: 'juan',
		lastName: 'pedro',
		description: 'Soy un estudiante de ingeniería civil en informática, me gusta la programación y el desarrollo de software.',
		phone: '(+56)1234-1234',
		birthDay: new Date( '1990-03-25' ),
		country: 'CL',
		gender: 'Hombre',
		preferences: [],
	})
]
