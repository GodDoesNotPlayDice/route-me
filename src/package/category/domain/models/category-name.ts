import { z } from 'zod'

export const CategoryNameSchema = z.object( {
  value : z.string()
} )

export type CategoryName = z.infer<typeof CategoryNameSchema>

interface CategoryNameProps {
  value : string
}

export const newCategoryName = (props : CategoryNameProps): CategoryName => {
  return CategoryNameSchema.parse( {
    value : props.value
  } )
}
