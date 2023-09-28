import { z } from 'zod'

export const RatingValueSchema = z.object( {
  value : z.string()
} )

export type RatingValue = z.infer<typeof RatingValueSchema>

interface RatingValueProps {
  value : string
}

export const newRatingValue = (props : RatingValueProps): RatingValue => {
  return RatingValueSchema.parse( {
    value : props.value
  } )
}
