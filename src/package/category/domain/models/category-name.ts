import { z } from 'zod'

export const CategoryNameSchema = z.object( {
  value : z.string()
} )

type CategoryNameType = z.infer<typeof CategoryNameSchema>
export interface CategoryName extends CategoryNameType {}

export interface CategoryNameProps {
  value : string
}

export const newCategoryName = (props : CategoryNameProps): CategoryName => {
  return CategoryNameSchema.parse( {
    value : props.value
  } )
}
