import { z } from 'zod'

export const PreferenceNameSchema = z.object( {
  value : z.string()
} )

type PreferenceNameType = z.infer<typeof PreferenceNameSchema>
export interface PreferenceName extends PreferenceNameType{}

export interface PreferenceNameProps {
  value : string
}

export const newPreferenceName = (props : PreferenceNameProps): PreferenceName => {
  return PreferenceNameSchema.parse( {
    value : props.value
  } )
}
