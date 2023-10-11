import { z } from 'zod'

export const CategoryIDSchema = z.object( {
  value : z.string()
} )

type CategoryIDType = z.infer<typeof CategoryIDSchema>
export interface CategoryID extends CategoryIDType {}

export interface CategoryIDProps {
  value : string
}

export const newCategoryID = (props : CategoryIDProps): CategoryID => {
  return CategoryIDSchema.parse( {
    value : props.value
  } )
}
