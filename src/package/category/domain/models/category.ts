import { z } from 'zod'
import {
	CategoryDescriptionSchema,
	CategoryIDSchema,
	CategoryNameSchema,
	CategoryPhotoSchema
} from '.'

export const CategorySchema = z.object( {
	id         : CategoryIDSchema,
	name       : CategoryNameSchema,
	photo      : CategoryPhotoSchema,
	description: CategoryDescriptionSchema
} )

export type Category = z.infer<typeof CategorySchema>

export interface CategoryProps {
	id: string
	name: string
	photo: string
	description: string
}

export const newCategory = ( props: CategoryProps ): Category => {
	return CategorySchema.parse( {
		id         : CategoryIDSchema.parse( {
			value: props.id
		} ),
		name       : CategoryNameSchema.parse( {
			value: props.name
		} ),
		photo      : CategoryPhotoSchema.parse( {
			value: props.photo
		} ),
		description: CategoryDescriptionSchema.parse( {
			value: props.description
		} )
	} )
}
