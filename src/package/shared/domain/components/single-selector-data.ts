import { z } from 'zod'

export const SingleSelectorDataSchema = z.object( {
  id: z.string(),
  name: z.string(),
  image: z.string(),
  selected: z.boolean()
} )

type SingleSelectorDataType = z.infer<typeof SingleSelectorDataSchema>

export interface SingleSelectorData extends SingleSelectorDataType {}

export interface SingleSelectorDataProps {
  id: string
  name: string
  image: string
  selected: boolean
}

export const newSingleSelectorData = ( props: SingleSelectorDataProps ): SingleSelectorData => {
  return SingleSelectorDataSchema.parse( {
    id: props.id,
    name: props.name,
    image: props.image,
    selected: props.selected
  } )
}
