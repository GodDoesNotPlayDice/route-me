import { z } from 'zod'

export const FilterButtonDataSchema = z.object( {
  image: z.string(),
  name  : z.string()
} )

export type FilterButtonData = z.infer<typeof FilterButtonDataSchema>

export const newFilterButtonData = ( props: FilterButtonData ): FilterButtonData => {
  return FilterButtonDataSchema.parse( {
    image: props.image,
    name  : props.name
  } )
}
