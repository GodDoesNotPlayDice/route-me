import {
	Err,
	Ok,
	Result
} from 'oxide.ts'
import {
	Category,
	newCategory
} from 'src/package/category/domain/models/category'
import { UnknownException } from 'src/package/shared/domain/exceptions/unknown-exception'

/**
 * Create a json from category instance
 * @throws {UnknownException} - if unknown error
 */
export const categoryToJson = ( category: Category ): Result<Record<string, any>, Error> => {
	try {
		const json: Record<string, any> = {
			id  : category.id.value,
			name: category.name.value
		}
		return Ok( json )
	}
	catch ( e ) {
		const err = e instanceof Error
			? new UnknownException( e.message )
			: new UnknownException( 'error category to json' )
		return Err( err )
	}
}

/**
 * Create a category instance from json
 * @throws {CategoryIdInvalidException} - if id is invalid
 * @throws {CategoryNameInvalidException} - if name is invalid
 */
export const categoryFromJson = ( json: Record<string, any> ): Result<Category, Error[]> => {

	const result = newCategory( {
		id    : json['id'],
		name: json['name']
	} )

	if ( result.isErr() ) {
		return Err( result.unwrapErr() )
	}

	return Ok( result.unwrap() )
}
