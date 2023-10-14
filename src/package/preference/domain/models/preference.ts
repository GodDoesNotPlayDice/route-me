import { PreferenceIcon } from 'src/package/preference/domain/models/preference-icon'
import { PreferenceID } from 'src/package/preference/domain/models/preference-id'
import { PreferenceName } from 'src/package/preference/domain/models/preference-name'

export interface Preference {
  id: PreferenceID
  name: PreferenceName
  icon: PreferenceIcon
}
