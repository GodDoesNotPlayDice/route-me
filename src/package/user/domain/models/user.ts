import { Option } from 'oxide.ts'
import { Driver } from 'src/package/driver/domain/models/driver'
import { Preference } from 'src/package/preference/domain/models/preference'
import { Rating } from 'src/package/rating/domain/models/rating'
import { Email } from 'src/package/shared/domain/models/email'
import { Gender } from 'src/package/shared/domain/models/gender'
import { Phone } from 'src/package/shared/domain/models/phone'
import { UserBirthDay } from 'src/package/user/domain/models/user-birth-day'
import { UserCountry } from 'src/package/user/domain/models/user-country'
import { UserDescription } from 'src/package/user/domain/models/user-description'
import { UserID } from 'src/package/user/domain/models/user-id'
import { UserLastName } from 'src/package/user/domain/models/user-last-name'
import { UserName } from 'src/package/user/domain/models/user-name'

export interface User {
  id: UserID
  email: Email,
  name : UserName
  lastName : UserLastName
  description : UserDescription
  gender : Gender
  country : UserCountry
  birthDay : UserBirthDay
  phone : Phone
  preferences : Preference[]
  rating : Rating
  driver : Option<Driver>
}
