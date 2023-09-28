import { z } from 'zod'

export const CategoryIDSchema = z.object( {
  value : z.string()
} )

export type CategoryID = z.infer<typeof CategoryIDSchema>

interface CategoryIDProps {
  value : string
}

export const newCategoryID = (props : CategoryIDProps): CategoryID => {
  return CategoryIDSchema.parse( {
    value : props.value
  } )
}
