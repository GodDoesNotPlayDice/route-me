import { z } from 'zod'

export const MultipleSelectorDataSchema = z.object( {
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  selected: z.boolean()
} )

type MultipleSelectorDataType = z.infer<typeof MultipleSelectorDataSchema>

export interface MultipleSelectorData extends MultipleSelectorDataType {}

export interface MultipleSelectorDataProps {
  id: string
  name: string
  icon: string
  selected: boolean
}

export const newMultipleSelectorData = ( props: MultipleSelectorDataProps ): MultipleSelectorData => {
  return MultipleSelectorDataSchema.parse( {
    id: props.id,
    name: props.name,
    icon: props.icon,
    selected: props.selected
  } )
}
