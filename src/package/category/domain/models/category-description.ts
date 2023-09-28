import { z } from 'zod'

export const CategoryDescriptionSchema = z.object( {
  value : z.string()
} )

export type CategoryDescription = z.infer<typeof CategoryDescriptionSchema>

interface CategoryDescriptionProps {
  value : string
}

export const newCategoryDescription = (props : CategoryDescriptionProps): CategoryDescription => {
  return CategoryDescriptionSchema.parse( {
    value : props.value
  } )
}
