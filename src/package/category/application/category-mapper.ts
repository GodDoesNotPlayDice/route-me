import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { Category } from 'src/package/category/domain/models/category'
import { newCategoryID } from 'src/package/category/domain/models/category-id'
import { newCategoryName } from 'src/package/category/domain/models/category-name'
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
  const errors: Error[] = []
  const id              = newCategoryID( {
    value: json['id'] ?? ''
  } )

  if ( id.isErr() ) {
    errors.push( id.unwrapErr() )
  }

  const name = newCategoryName( {
    value: json['name'] ?? ''
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
