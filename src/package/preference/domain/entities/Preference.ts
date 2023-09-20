import { PreferenceIcon } from 'src/package/preference/domain/value-objects/PreferenceIcon'
import { PreferenceID } from 'src/package/preference/domain/value-objects/PreferenceID'
import { PreferenceName } from 'src/package/preference/domain/value-objects/PreferenceName'

export class Preference {
  private constructor(
    readonly id : PreferenceID,
    readonly name : PreferenceName,
    readonly icon : PreferenceIcon
  ) {}

  static from(
    id : PreferenceID,
    name : PreferenceName,
    icon : PreferenceIcon
  ) : Preference {
    return new Preference(
      id,
      name,
      icon
    )
  }
}
