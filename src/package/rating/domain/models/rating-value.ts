import { z } from 'zod'

export const RatingValueSchema = z.object( {
  value : z.string()
} )

type RatingValueType = z.infer<typeof RatingValueSchema>
export interface RatingValue extends RatingValueType {}

export interface RatingValueProps {
  value : string
}

export const newRatingValue = (props : RatingValueProps): RatingValue => {
  return RatingValueSchema.parse( {
    value : props.value
  } )
}
