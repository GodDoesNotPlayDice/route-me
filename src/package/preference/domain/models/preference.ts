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
export const newPreference = (props : PreferenceProps): Preference => {
	return {
		id: newPreferenceID({
			value: props.id
		}),
		name: newPreferenceName({
			value: props.name
		}),
		icon: newPreferenceIcon({
			value: props.icon
		})
	}}
