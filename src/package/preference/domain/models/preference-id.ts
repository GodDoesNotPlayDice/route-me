import { z } from 'zod'

export const PreferenceIDSchema = z.object( {
  value : z.string()
} )

export type PreferenceID = z.infer<typeof PreferenceIDSchema>

interface PreferenceIDProps {
  value : string
}

export const newPreferenceID = (props : PreferenceIDProps): PreferenceID => {
  return PreferenceIDSchema.parse( {
    value : props.value
  } )
}
