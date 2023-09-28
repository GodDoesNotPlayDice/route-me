import { z } from 'zod'

export const PreferenceItemSchema = z.object( {
  icon    : z.string(),
  name    : z.string(),
  selected: z.boolean()
} )

export type PreferenceItem = z.infer<typeof PreferenceItemSchema>

export const newPreferenceItem = ( props: PreferenceItem ): PreferenceItem => {
  return PreferenceItemSchema.parse( {
    icon    : props.icon,
    name    : props.name,
    selected: props.selected
  } )
}
