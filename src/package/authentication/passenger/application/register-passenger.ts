import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { AuthPassengerRepository } from 'src/package/authentication/passenger/domain/auth-passenger-repository'
import {
  newPassenger,
  PassengerProps
} from 'src/package/passenger/domain/models/passenger'
import { newGender } from 'src/package/shared/domain/models/gender'
import { UserID } from 'src/package/user/domain/models/user-id'
import { ulid } from 'ulidx'

export const registerPassenger = async ( repository: AuthPassengerRepository,
  props: {
    name: string,
    userID: UserID,
    lastName: string,
    phone: string,
    birthDay: Date,
    country: string,
    gender: string
  } ): Promise<Result<string, string>> => {
  try {
    const result   = await repository.register(
      newPassenger( {
        id      : ulid(),
        description: '',
        preferences: [],
        userID: props.userID,
        name    : props.name,
        lastName: props.lastName,
        country : props.country,
        phone   : props.phone,
        birthDay: props.birthDay,
        gender  : newGender( {
          value: props.gender,
        })
      } )
    )
    const response = result.unwrap()
    return Promise.resolve( Ok( response ) )
  }
  catch ( e ) {
    return Promise.resolve( Err( 'register error' ) )
  }
}
