import {
	newPreferenceIcon,
	newPreferenceID,
	newPreferenceName,
	PreferenceIcon,
	PreferenceID,
	PreferenceName
} from '.'

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
