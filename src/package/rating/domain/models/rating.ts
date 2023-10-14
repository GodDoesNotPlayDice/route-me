import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  newRatingID,
  RatingID
} from 'src/package/rating/domain/models/rating-id'
import {
  newRatingValue,
  RatingValue
} from 'src/package/rating/domain/models/rating-value'

export interface Rating {
  id: RatingID,
  value: RatingValue
}

export interface RatingProps {
  id: string
  value: string
}

/**
 * Create a rating instance
 * @throws {RatingIdInvalidException} - if id is invalid
 * @throws {RatingValueInvalidException} - if value is invalid
 */
export const newRating = ( props: RatingProps ): Result<Rating, Error[]> => {
  const err: Error[] = []

  const id = newRatingID( {
    value: props.id
  } )

  if ( id.isErr() ) {
    err.push( id.unwrapErr() )
  }

  const value = newRatingValue( {
    value: props.value
  } )

  if ( value.isErr() ) {
    err.push( value.unwrapErr() )
  }

  if ( err.length > 0 ) {
    return Err( err )
  }

  return Ok( {
      id   : id.unwrap(),
      value: value.unwrap()
    }
  )
}
