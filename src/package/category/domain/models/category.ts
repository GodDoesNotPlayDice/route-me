import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	CategoryID,
	newCategoryID
} from 'src/package/category/domain/models/category-id'
import {
	CategoryName,
	newCategoryName
} from 'src/package/category/domain/models/category-name'

export interface Category {
	id: CategoryID
	name: CategoryName
}

export interface CategoryProps {
	id: string
	name: string
}

/**
 * Create category instance
 * @throws {CategoryIdInvalidException} - if id is invalid
 * @throws {CategoryNameInvalidException} - if name is invalid
 */
export const newCategory = ( props: CategoryProps ): Result<Category, Error[]> => {
	const errors: Error[] = []
	const id              = newCategoryID( {
		value: props.id
	} )

	if ( id.isErr() ) {
		errors.push( id.unwrapErr() )
	}

	const name = newCategoryName( {
		value: props.name
	} )

	if ( name.isErr() ) {
		errors.push( name.unwrapErr() )
	}

	if ( errors.length > 0 ) {
		return Err( errors )
	}
	return Ok( {
		id  : id.unwrap(),
		name: name.unwrap()
	} )
}
