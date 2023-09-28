import { z } from 'zod'

export const RatingIDSchema = z.object( {
  value : z.string()
} )

export type RatingID = z.infer<typeof RatingIDSchema>

interface RatingIDProps {
  value : string
}

export const newRatingID = (props : RatingIDProps): RatingID => {
  return RatingIDSchema.parse( {
    value : props.value
  } )
}
