import { Option } from 'oxide.ts'
import { PassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { PassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { PassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { PassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Preference } from 'src/package/preference/domain/models/preference'
import { Email } from 'src/package/shared/domain/models/email'
import { Gender } from 'src/package/shared/domain/models/gender'
import { ImageUrl } from 'src/package/shared/domain/models/image-url'
import { Phone } from 'src/package/shared/domain/models/phone'
import { ValidNumber } from 'src/package/shared/domain/models/valid-number'
import {ValidBoolean} from "../../../shared/domain/models/valid-bool";

export interface Passenger {
	id: PassengerID
	image: Option<ImageUrl>
	name: PassengerName
	lastName: PassengerLastName
	description: PassengerDescription
	gender: Gender
	country: PassengerCountry
	birthDay: PassengerBirthDay
	phone: Phone
	inTrip: ValidBoolean
	preferences: Preference[]
	email: Email
	averageRating: ValidNumber
}
