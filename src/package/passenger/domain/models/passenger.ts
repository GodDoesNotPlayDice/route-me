import { PassengerBirthDay } from 'src/package/passenger/domain/models/passenger-birth-day'
import { PassengerCountry } from 'src/package/passenger/domain/models/passenger-country'
import { PassengerDescription } from 'src/package/passenger/domain/models/passenger-description'
import { PassengerID } from 'src/package/passenger/domain/models/passenger-id'
import { PassengerLastName } from 'src/package/passenger/domain/models/passenger-last-name'
import { PassengerName } from 'src/package/passenger/domain/models/passenger-name'
import { PassengerPhone } from 'src/package/passenger/domain/models/passenger-phone'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import { Gender } from 'src/package/shared/domain/models/gender'
import { UserID } from 'src/package/user/domain/models/user-id'

export interface Passenger {
  id: PassengerID
  userID: UserID
  name: PassengerName
  lastName: PassengerLastName
  description: PassengerDescription
  phone: PassengerPhone
  birthDay: PassengerBirthDay
  country: PassengerCountry
  gender: Gender
  preferences: PreferenceID[]
}
