import { z } from 'zod'

export const CategoryDescriptionSchema = z.object( {
  value: z.string()
} )

type CategoryDescriptionType = z.infer<typeof CategoryDescriptionSchema>

export interface CategoryDescription extends CategoryDescriptionType {}

export interface CategoryDescriptionProps {
  value: string
}

export const newCategoryDescription = ( props: CategoryDescriptionProps ): CategoryDescription => {
  return CategoryDescriptionSchema.parse( {
    value: props.value
  } )
}
