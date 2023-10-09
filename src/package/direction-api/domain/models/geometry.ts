import { z } from 'zod'

export const GeometrySchema = z.object( {
	values  : z.array( z.array( z.number() ) ),
} )
type GeometryType = z.infer<typeof GeometrySchema>
export interface Geometry extends GeometryType {}
export interface GeometryProps {
	values: Array<number[]>;
}

export const newGeometry = ( props: GeometryProps ): Geometry => {
	return GeometrySchema.parse( {
		values: props.values,
	} )
}

