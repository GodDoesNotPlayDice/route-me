import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import { CategoryIdInvalidException } from 'src/package/category/domain/exceptions/category-id-invalid-exception'
import { z } from 'zod'

export const CategoryIDSchema = z.object( {
	value: z.string()
	        .min( 1 )
} )

type CategoryIDType = z.infer<typeof CategoryIDSchema>

export interface CategoryID extends CategoryIDType {}

export interface CategoryIDProps {
	value: string
}

/**
 * Create category id instance
 * @throws {CategoryIdInvalidException} - if id is invalid
 */
export const newCategoryID = ( props: CategoryIDProps ): Result<CategoryID, Error> => {
	const result = CategoryIDSchema.safeParse( {
		value: props.value
	} )

	if ( !result.success ) {
		return Err( new CategoryIdInvalidException() )
	}
	else {
		return Ok( result.data )
	}
}
