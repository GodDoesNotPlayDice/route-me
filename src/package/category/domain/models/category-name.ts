import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CategoryNameInvalidException } from 'src/package/category/domain/exceptions/category-name-invalid-exception'
import { z } from 'zod'

export const CategoryNameSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type CategoryNameType = z.infer<typeof CategoryNameSchema>

export interface CategoryName extends CategoryNameType {}

export interface CategoryNameProps {
	value: string
}

/**
 * Create category name instance
 * @throws {CategoryNameInvalidException} - if name is invalid
 */
export const newCategoryName = ( props: CategoryNameProps ): Result<CategoryName, Error> => {
	const result = CategoryNameSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new CategoryNameInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
