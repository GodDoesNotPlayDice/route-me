import { z } from 'zod'

export const PreferenceNameSchema = z.object( {
  value : z.string()
} )

export type PreferenceName = z.infer<typeof PreferenceNameSchema>

interface PreferenceNameProps {
  value : string
}

export const newPreferenceName = (props : PreferenceNameProps): PreferenceName => {
  return PreferenceNameSchema.parse( {
    value : props.value
  } )
}
