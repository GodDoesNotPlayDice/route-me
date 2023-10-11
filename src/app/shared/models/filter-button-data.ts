import { z } from 'zod'

export const FilterButtonDataSchema = z.object( {
  image: z.string(),
  name  : z.string()
} )

type FilterButtonDataType = z.infer<typeof FilterButtonDataSchema>
export interface FilterButtonData extends FilterButtonDataType {}

export interface FilterButtonDataProps {
  image: string,
  name: string
}

export const newFilterButtonData = ( props: FilterButtonDataProps ): FilterButtonData => {
  return FilterButtonDataSchema.parse( {
    image: props.image,
    name  : props.name
  } )
}
