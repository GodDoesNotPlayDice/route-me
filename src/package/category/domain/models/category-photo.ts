import { z } from 'zod'

export const CategoryPhotoSchema = z.object( {
  value: z.string()
} )

type CategoryPhotoType = z.infer<typeof CategoryPhotoSchema>

export interface CategoryPhoto extends CategoryPhotoType {}

export interface CategoryPhotoProps {
  value: string
}

export const newCategoryPhoto = ( props: CategoryPhotoProps ): CategoryPhoto => {
  return CategoryPhotoSchema.parse( {
    value: props.value
  } )
}
