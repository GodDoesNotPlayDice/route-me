import { PassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { PassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { PassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { PassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { Preference } from 'src/package/preference/domain/models/preference'
import { Rating } from 'src/package/rating/domain/models/rating'
import { Email } from 'src/package/shared/domain/models/email'
import { Gender } from 'src/package/shared/domain/models/gender'
import { ImageUrl } from 'src/package/shared/domain/models/image-url'
import { Phone } from 'src/package/shared/domain/models/phone'

export interface Passenger {
  id: PassengerID
  email: Email
  image: ImageUrl
  name: PassengerName
  lastName: PassengerLastName
  description: PassengerDescription
  gender: Gender
  country: PassengerCountry
  birthDay: PassengerBirthDay
  phone: Phone
  preferences: Preference[]
  rating: Rating
}
