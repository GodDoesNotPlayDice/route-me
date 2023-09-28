import { z } from 'zod'

export const CategoryPhotoSchema = z.object( {
  value : z.string()
} )

export type CategoryPhoto = z.infer<typeof CategoryPhotoSchema>

interface CategoryPhotoProps {
  value : string
}

export const newCategoryPhoto = (props : CategoryPhotoProps): CategoryPhoto => {
  return CategoryPhotoSchema.parse( {
    value : props.value
  } )
}
