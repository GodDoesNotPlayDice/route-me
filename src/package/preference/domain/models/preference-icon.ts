import { z } from 'zod'

export const PreferenceIconSchema = z.object( {
  value : z.string()
} )

export type PreferenceIcon = z.infer<typeof PreferenceIconSchema>

interface PreferenceIconProps {
  value : string
}

export const newPreferenceIcon = (props : PreferenceIconProps): PreferenceIcon => {
  return PreferenceIconSchema.parse( {
    value : props.value
  } )
}
