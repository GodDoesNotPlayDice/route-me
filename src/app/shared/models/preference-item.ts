import {
  Preference,
} from 'src/package/preference'

export interface PreferenceItem extends Preference {
  selected: boolean
}
export interface PreferenceItemProps extends Preference {
  selected: boolean
}

export const newPreferenceItem = ( props: PreferenceItemProps ): PreferenceItem => {
  return {
    ...props
  }
}
