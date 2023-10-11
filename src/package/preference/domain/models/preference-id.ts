import { z } from 'zod'

export const PreferenceIDSchema = z.object( {
  value : z.string()
} )

type PreferenceIDType = z.infer<typeof PreferenceIDSchema>
export interface PreferenceID extends PreferenceIDType {}

export interface PreferenceIDProps {
  value : string
}

export const newPreferenceID = (props : PreferenceIDProps): PreferenceID => {
  return PreferenceIDSchema.parse( {
    value : props.value
  } )
}
