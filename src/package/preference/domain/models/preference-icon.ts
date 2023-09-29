import { z } from 'zod'

export const PreferenceIconSchema = z.object( {
  value : z.string()
} )

type PreferenceIconType = z.infer<typeof PreferenceIconSchema>
export interface PreferenceIcon extends PreferenceIconType {}

export interface PreferenceIconProps {
  value : string
}

export const newPreferenceIcon = (props : PreferenceIconProps): PreferenceIcon => {
  return PreferenceIconSchema.parse( {
    value : props.value
  } )
}
