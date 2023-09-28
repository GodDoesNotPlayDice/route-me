import { z } from 'zod'
import {
	RatingIDSchema,
	RatingValueSchema
} from '.'

export const RatingSchema = z.object( {
	id   : RatingIDSchema,
	value: RatingValueSchema
} )

export type Rating = z.infer<typeof RatingSchema>

export interface RatingProps {
	id: string
	value: string
}

export const newRating = ( props: RatingProps ): Rating => {
	return RatingSchema.parse( {
		id   : RatingIDSchema.parse( {
			value: props.id
		} ),
		value: RatingValueSchema.parse( {
			value: props.value
		} )
	} )
}
