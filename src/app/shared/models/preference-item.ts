import { z } from 'zod'

export const PreferenceItemSchema = z.object( {
  icon    : z.string(),
  name    : z.string(),
  selected: z.boolean()
} )

type PreferenceItemType = z.infer<typeof PreferenceItemSchema>
export interface PreferenceItem extends PreferenceItemType {}
export interface PreferenceItemProps {
  icon    : string,
  name    : string,
  selected: boolean
}

export const newPreferenceItem = ( props: PreferenceItemProps ): PreferenceItem => {
  return PreferenceItemSchema.parse( {
    icon    : props.icon,
    name    : props.name,
    selected: props.selected
  } )
}
