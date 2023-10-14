import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  newPreferenceIcon,
  PreferenceIcon
} from 'src/package/preference/domain/models/preference-icon'
import {
  newPreferenceID,
  PreferenceID
} from 'src/package/preference/domain/models/preference-id'
import {
  newPreferenceName,
  PreferenceName
} from 'src/package/preference/domain/models/preference-name'

export interface Preference {
  id: PreferenceID
  name: PreferenceName
  icon: PreferenceIcon
}

export interface PreferenceProps {
  id: string
  name: string
  icon: string
}

/**
 * Create a preference icon instance
 * @throws {PreferenceIdInvalidException} - if id is invalid
 * @throws {PreferenceNameInvalidException} - if name is invalid
 * @throws {PreferenceIconInvalidException} - if icon is invalid
 */
export const newPreference = ( props: PreferenceProps ): Result<Preference, Error[]> => {
  const errors: Error[] = []

  const id = newPreferenceID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    errors.push( id.unwrapErr() )
  }

  const name = newPreferenceName( {
    value: props.name
  } )

  if ( name.isErr() ) {
    errors.push( name.unwrapErr() )
  }

  const icon = newPreferenceIcon( {
    value: props.icon
  } )

  if ( icon.isErr() ) {
    errors.push( icon.unwrapErr() )
  }

  if ( errors.length > 0 ) {
    return Err( errors )
  }

  return Ok( {
    id  : id.unwrap(),
    name: name.unwrap(),
    icon: icon.unwrap()
  } )
}
