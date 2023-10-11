import { z } from 'zod'

export const RatingIDSchema = z.object( {
  value : z.string()
} )

type RatingIDType = z.infer<typeof RatingIDSchema>
export interface RatingID extends RatingIDType {}

export interface RatingIDProps {
  value : string
}

export const newRatingID = (props : RatingIDProps): RatingID => {
  return RatingIDSchema.parse( {
    value : props.value
  } )
}
